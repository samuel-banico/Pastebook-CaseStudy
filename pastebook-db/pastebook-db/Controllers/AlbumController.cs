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

        public AlbumController(AlbumRepository repo)
        {
            _albumRepository = repo;
        }

        // --- GET
        [HttpGet("{id}")]
        public ActionResult<Album> GetAlbumById(int albumId) 
        {
            var album = _albumRepository.GetAlbumById(albumId);

            return Ok(new { result = "retreived successful", album });
        }

        [HttpGet("allAlbumByUser")]
        public ActionResult<List<AlbumDTO>> GetAllAlbumsByOwner(int userId)
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
        public ActionResult<List<AlbumDTO>> GetAllAlbumsOfOthers(int retrievedUserId, int loggedUserId)
        {
            var albums = _albumRepository.GetAllAlbumByOther(retrievedUserId, loggedUserId);

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
            var newAlbum  = new Album 
            {
                AlbumName = album.AlbumName,
                AlbumDescription = album.AlbumDescription,
                IsPublic = album.IsPublic,
                CoverAlbumImage = album.CoverAlbumImage,

                UserId = album.UserId,

                AlbumImageList = album.AlbumImageList
            };

            _albumRepository.CreateAlbum(newAlbum);

            return Ok();
        }

        // --- PUT
        [HttpPut]
        public ActionResult<Album> AlbumPost(int albumId, AlbumDTO newAlbum)
        {
            var albumToEdit = _albumRepository.GetAlbumById(albumId);

            if (albumToEdit == null)
                return BadRequest(new { result = "no_album" });

            albumToEdit.AlbumName = newAlbum.AlbumName;
            albumToEdit.AlbumDescription = newAlbum.AlbumDescription;
            albumToEdit.IsPublic = newAlbum.IsPublic;
            albumToEdit.IsEdited = true;
            albumToEdit.CreatedOn = DateTime.Now;
            albumToEdit.CoverAlbumImage = newAlbum.CoverAlbumImage;
            albumToEdit.AlbumImageList = newAlbum.AlbumImageList;

            _albumRepository.UpdateAlbum(albumToEdit);

            return Ok(albumToEdit);
        }
        
        // --- DELETE
        [HttpDelete]
        public ActionResult<Album> DeleteAlbum(int albumImageId)
        {
            var albumToDelete = _albumRepository.GetAlbumById(albumImageId);

            if(albumToDelete == null)
                return NotFound(new { result = "album_does_not_exist" });

            _albumRepository.DeleteAlbum(albumToDelete);

            return Ok(new { result = "album_deleted" });
        }
    }
}
