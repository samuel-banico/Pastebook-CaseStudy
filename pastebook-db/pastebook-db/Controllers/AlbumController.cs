using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/posts")]
    public class AlbumController : Controller
    {
        private readonly AlbumRepository _albumRepository;
        private readonly NotificationRepository _notificationRepository;

        public AlbumController(AlbumRepository repo)
        {
            _albumRepository = repo;
        }

        [HttpGet("{id}")]
        public ActionResult<Album> GetAlbum(int albumId) 
        {
            var album = _albumRepository.GetAlbumById(albumId);

            return Ok(new { result = "retreived successful", album });
        }

        /*[HttpPost]
        public ActionResult<Album> CreateAlbum() 
        {
            
        }*/
    }
}
