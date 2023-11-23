using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/albums")]
    public class AlbumController : Controller
    {
        private readonly AlbumRepository _albumRepository;
        private readonly AlbumImageRepository _albumImageRepository;
        private readonly UserRepository _userRepository;

        public AlbumController(AlbumRepository repo, AlbumImageRepository albumImageRepository, UserRepository userRepository)
        {
            _albumRepository = repo;
            _albumImageRepository = albumImageRepository;
            _userRepository = userRepository;
        }

        // --- GET
        [HttpGet("{id}")]
        public ActionResult<Album> GetAlbumById(Guid albumId) 
        {
            var album = _albumRepository.GetAlbumById(albumId);

            return Ok(new { result = "retreived successful", album });
        }

        [HttpGet("allAlbumByUser")]
        public ActionResult<List<AlbumDTO>> GetAllAlbumsByOwner(Guid userId)
        {
            var albums = _albumRepository.GetAllAlbumByOwner(userId);

            if (albums == null || albums.Count == 0)
                return Ok(new { result = "no_album" });

            var userAlbums = new List<AlbumDTO>();
            foreach (var album in albums)
            {
                var albumDto = _albumRepository.ConvertAlbumToAlbumDTO(album);

                userAlbums.Add(albumDto);
            }

            return Ok(userAlbums);

        }

        [HttpGet("allAlbumByOther")]
        public ActionResult<List<AlbumDTO>> GetAllAlbumsOfOthers(Guid retrievedUserId)
        {
            var token = Request.Headers["Authorization"];
            var loggedUserId = _userRepository.GetUserByToken(token);

            if (loggedUserId == null)
                return BadRequest(new { result = "no_user" });

            var albums = _albumRepository.GetAllAlbumByOther(retrievedUserId, loggedUserId.Id);

            if (albums.Count == 0)
                return Ok(new { result = "no_album" });

            var otherAlbums = new List<AlbumDTO>();
            foreach (var album in albums)
            {
                var albumDto = _albumRepository.ConvertAlbumToAlbumDTO(album);

                otherAlbums.Add(albumDto);
            }

            return Ok(otherAlbums);
        }

        // --- POST
        [HttpPost]
        public ActionResult<Album> CreateAlbum(AlbumDTO album)
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user"});

            var newAlbum  = new Album 
            {
                AlbumName = album.AlbumName,
                AlbumDescription = album.AlbumDescription,
                IsPublic = true,
                UserId = user.Id,
            };

            _albumRepository.CreateAlbum(newAlbum);

            return Ok(newAlbum);
        }

        // --- PUT
        // To be edit
        [HttpPut]
        public ActionResult<Album> UpdateAlbum(Guid albumId, AlbumDTO newAlbum)
        {
            var albumToEdit = _albumRepository.GetAlbumById(albumId);

            if (albumToEdit == null)
                return BadRequest(new { result = "no_album" });

            albumToEdit.AlbumName = newAlbum.AlbumName;
            albumToEdit.AlbumDescription = newAlbum.AlbumDescription;
            albumToEdit.IsPublic = true;
            albumToEdit.IsEdited = true;
            albumToEdit.CreatedOn = DateTime.Now;
            albumToEdit.CoverAlbumImage = newAlbum.CoverAlbumImage;
            //albumToEdit.AlbumImageList = newAlbum.AlbumImageList;

            _albumRepository.UpdateAlbum(albumToEdit);

            return Ok(albumToEdit);
        }

        [HttpPut("addCoverPhoto")]
        public ActionResult<Album> AssignCoverToAlbum(Guid albumId)
        {
            var albumToEdit = _albumRepository.GetAlbumById(albumId);
            var coverImage = _albumImageRepository.GetFirstPhotoOfAlbum(albumId);

            if (coverImage == null)
                return Ok(new { result = "no_albumImage" });

            albumToEdit.CoverAlbumImage = coverImage;

            _albumRepository.UpdateAlbum(albumToEdit);

            return Ok(albumToEdit);
        }

        // --- DELETE
        [HttpDelete]
        public ActionResult<Album> DeleteAlbum(Guid albumImageId)
        {
            var albumToDelete = _albumRepository.GetAlbumById(albumImageId);

            if(albumToDelete == null)
                return NotFound(new { result = "album_does_not_exist" });

            _albumRepository.DeleteAlbum(albumToDelete);

            return Ok(new { result = "album_deleted" });
        }
    }
}
