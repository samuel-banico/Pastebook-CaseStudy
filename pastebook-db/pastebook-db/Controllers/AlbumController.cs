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
        public ActionResult<List<AlbumDTO>> GetAllAlbumsOfOthers(Guid retrievedUserId, Guid loggedUserId)
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
                IsPublic = true,
                UserId = album.UserId,
            };

            _albumRepository.CreateAlbum(newAlbum);

            /*var albumList = _albumRepository.GetAllAlbumByOwner(album.UserId);
            newAlbum.Id = albumList[albumList.Count - 1].Id;*/

            /*if (album.ImageList != null || album.ImageList.Count > 0) 
            {
                foreach (var image in album.ImageList) 
                {
                    var albumImage = new AlbumImage
                    {
                        Image = _userRepository.ImageToByteArray(image),
                        CreatedOn = DateTime.Now,
                        IsEdited = false,
                        AlbumId = newAlbum.Id
                    };

                    _albumImageRepository.CreateAlbumImage(albumImage);

                    if (newAlbum.CoverAlbumImage != null) 
                    {
                        newAlbum.CoverAlbumImage = albumImage.Image;
                        _albumRepository.UpdateAlbum(newAlbum);
                    }
                }
            }*/

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
