using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [Route("api/albumImageLike")]
    [ApiController]
    public class AlbumImageLikeController : ControllerBase
    {
        private readonly AlbumImageLikeRepository _albumImageLikeRepository;
        private readonly NotificationRepository _notificationRepository;

        public AlbumImageLikeController(AlbumImageLikeRepository albumImageLikeRepository, NotificationRepository notificationRepository)
        {
            _albumImageLikeRepository = albumImageLikeRepository;
            _notificationRepository = notificationRepository;
        }

        [HttpGet]
        public ActionResult<Post> GetPostLikeById(int id)
        {
            var postLike = _albumImageLikeRepository.GetAlbumImageLikeById(id);
            return Ok(postLike);
        }

        [HttpGet("allAlbumImageLike")]
        public ActionResult<Post> GetAllPostLike()
        {
            var postLikes = _albumImageLikeRepository.GetAllAlbumImageLikes();
            return Ok(postLikes);
        }

        // A friend has liked a user's post
        [HttpPut("likeAlbumImage")]
        public ActionResult<Post> LikedAlbumImage(int albumImageId, int loggedUserId)
        {
            var albumImageLike = new AlbumImageLike
            {
                AlbumImageId = albumImageId,
                UserId = loggedUserId
            };

            _albumImageLikeRepository.CreateAlbumImageLike(albumImageLike);

            _notificationRepository.CreateNotifAlbumImageLike(albumImageLike);

            return Ok(new { result = "post_liked" });
        }

        // A friend has unliked a user's post
        [HttpPut("unlikeAlbumImage")]
        public ActionResult<Post> UnlikedAlbumImage(int albumImageLikeId)
        {
            var albumImageLike = _albumImageLikeRepository.GetAlbumImageLikeById(albumImageLikeId);

            if (albumImageLike == null)
                return NotFound(new { result = "post_like_not_found" });

            _albumImageLikeRepository.RemoveAlbumImageLike(albumImageLike);

            return Ok(new { result = "post_unliked" });
        }
    }
}
