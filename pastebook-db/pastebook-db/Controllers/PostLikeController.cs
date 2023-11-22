using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [Route("api/postLike")]
    [ApiController]
    public class PostLikeController : ControllerBase
    {
        private readonly PostLikeRepository _postLikeRepository;
        private readonly NotificationRepository _notificationRepository;

        public PostLikeController(PostLikeRepository postLikeRepository, NotificationRepository notificationRepository)
        {
            _postLikeRepository = postLikeRepository;
            _notificationRepository = notificationRepository;
        }

        [HttpGet]
        public ActionResult<Post> GetPostLikeById(Guid id) 
        {
            var postLike = _postLikeRepository.GetPostLikeById(id);
            return Ok(postLike);
        }

        [HttpGet("allPostLike")]
        public ActionResult<Post> GetAllPostLike()
        {
            var postLikes = _postLikeRepository.GetAllPostLikes();
            return Ok(postLikes);
        }

        // A friend has liked a user's post
        [HttpPut("likePost")]
        public ActionResult<Post> LikedPost(Guid postId, Guid loggedUserId)
        {
            var postLike = new PostLike
            {
                PostId = postId,
                UserId = loggedUserId,
                CreatedOn = DateTime.Now,
            };
            _postLikeRepository.CreatePostLike(postLike);

            _notificationRepository.CreateNotifPostLike(postLike);

            return Ok(new { result = "post_liked" });
        }

        // A friend has unliked a user's post
        [HttpPut("unlikePost")]
        public ActionResult<Post> UnlikedPost(Guid postLikeId)
        {
            var postLike = _postLikeRepository.GetPostLikeById(postLikeId);

            if (postLike == null)
                return NotFound(new { result = "post_like_not_found" });

            _postLikeRepository.RemovePostLike(postLike);

            return Ok(new { result = "post_unliked" });
        }
    }
}
