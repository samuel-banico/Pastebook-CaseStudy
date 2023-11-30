﻿using Microsoft.AspNetCore.Http;
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
        private readonly UserRepository _userRepository;

        public PostLikeController(PostLikeRepository postLikeRepository, NotificationRepository notificationRepository, UserRepository userRepository)
        {
            _postLikeRepository = postLikeRepository;
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
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
        [HttpPost("likePost")]
        public ActionResult<Post> LikedPost(PostLikeDTO like)
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            var postLike = new PostLike
            {
                PostId = like.PostId,
                UserId = user.Id,
                CreatedOn = DateTime.Now,
            };
            _postLikeRepository.CreatePostLike(postLike);

            _notificationRepository.CreateNotifPostLike(postLike);

            return Ok(new { result = "post_liked" });
        }

        // A friend has unliked a user's post
        [HttpDelete("unlikePost")]
        public ActionResult<Post> UnlikedPost()
        {
            var postId = Guid.Parse(Request.Query["postId"].ToString());
            var postLike = _postLikeRepository.GetPostLikeById(postId);

            if (postLike == null)
                return NotFound(new { result = "post_like_not_found" });

            _postLikeRepository.RemovePostLike(postLike);

            return Ok(new { result = "post_unliked" });
        }
    }
}
