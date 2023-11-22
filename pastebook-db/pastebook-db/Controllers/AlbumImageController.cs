using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [Route("api/albumImage")]
    [ApiController]
    public class AlbumImageController : ControllerBase
    {
        private readonly AlbumImageRepository _albumImageRepository;

        public AlbumImageController(AlbumImageRepository albumImageRepository)
        {
            _albumImageRepository = albumImageRepository;
        }

        [HttpGet("{id}")]
        public ActionResult<AlbumImage> GetAlbumImageById(Guid id)
        {
            var album = _albumImageRepository.GetAlbumImageById(id);

            if(album == null)
                return NotFound(new { result = "album_does_not_exist"});

            return Ok(album);
        }

        [HttpGet("getAllAlbumImage")]
        public ActionResult<AlbumImage> GetAllAlbumImageByAlbumId(Guid albumId) 
        {
            var albumImageList = _albumImageRepository.GetAllAlbumImagesByAlbumId(albumId);

            if(albumImageList == null || albumImageList.Count == 0)
                return NotFound(albumImageList);

            return Ok(albumImageList);
        }

        [HttpPost]
        public ActionResult<AlbumImage> CreateAlbumImage(Guid albumId, IFormFile image) 
        {
            using var memoryStream = new MemoryStream();
            image.CopyTo(memoryStream);

            var newAlbumImage = new AlbumImage
            {
                Image = memoryStream.ToArray(),
                CreatedOn = DateTime.Now,
                IsEdited = false,
                AlbumId = albumId
            };

            _albumImageRepository.CreateAlbumImage(newAlbumImage);

            return Ok(new { result = "created_albumImage", newAlbumImage });
        }

        [HttpPut]
        public ActionResult<AlbumImage> UpdateAlbumImage(Guid albumImageId, AlbumImageDTO albumImage) 
        {
            var aImage = _albumImageRepository.GetAlbumImageById(albumImageId);

            if (albumImage == null)
                return BadRequest(new { result = "no_album_iamge" });

            aImage.Image = albumImage.Image;
            aImage.IsEdited = true;
            aImage.CreatedOn = DateTime.Now;

            _albumImageRepository.UpdateAlbumImage(aImage);

            return Ok(new { result = "updated_albumImage" });
        }

        [HttpDelete]
        public ActionResult<AlbumImage> DeleteAlbumImageById(Guid albumImageId) 
        {
            var image = _albumImageRepository.GetAlbumImageById(albumImageId);

            if (image == null)
                return BadRequest(new { result = "album_image_does_not_exist" });

            _albumImageRepository.DeleteAlbumImage(image);

            return Ok(new { result = "deleted_albumImage" });
        }
    }
}
