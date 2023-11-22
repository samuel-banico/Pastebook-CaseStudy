using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Data;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [Route("api/postComment")]
    [ApiController]
    public class PostCommentController : ControllerBase
    {
        private readonly PostCommentRepository _postCommentRepository;
        private readonly NotificationRepository _notificationRepository;

        public PostCommentController(PostCommentRepository postCommentRepository, NotificationRepository notificationRepository)
        {
            _postCommentRepository = postCommentRepository;
            _notificationRepository = notificationRepository;
        }

        [HttpGet]
        public ActionResult<Post> GetPostCommentById(Guid id) 
        {
            var postComment = _postCommentRepository.GetPostCommmentById(id);

            if(postComment == null)
                return NotFound(new { result = "no_post_comment" });

            return Ok(postComment);
        }

        [HttpGet("allPostComments")]
        public ActionResult<Post> GetAllPostComments(int id)
        {
            var postComment = _postCommentRepository.GetAllPostComments();

            if (postComment == null)
                return NotFound(new { result = "no_post_comment" });

            return Ok(postComment);
        }

        [HttpPut("commentPost")]
        public ActionResult<Post> CommentPost(Guid postId, Guid loggedUserId, string comment)
        {
            var postComment = new PostComment
            {
                PostId = postId,
                UserId = loggedUserId,
                Comment = comment,
                CreatedOn = DateTime.Now,
                IsEdited = false
            };

            _postCommentRepository.CreatePostComment(postComment);

            _notificationRepository.CreateNotifPostComment(postComment);

            return Ok(new { result = "post_liked" });
        }

        [HttpPut("edittedCommentPost")]
        public ActionResult<Post> EditCommentPost(Guid postCommentId, string comment)
        {
            var postComment = _postCommentRepository.GetPostCommmentById(postCommentId);

            if (postComment == null)
                return NotFound(new { result = "post_comment_not_found" });

            postComment.Comment = comment;
            postComment.IsEdited = true;
            postComment.CreatedOn = DateTime.Now;

            _postCommentRepository.UpdatePostComment(postComment);

            return Ok(new { result = "post_comment_editted" });
        }

        //unfinished
        [HttpPut("uncommentPost")]
        public ActionResult<Post> UncommentPost(Guid postCommentId)
        {
            var postComment = _postCommentRepository.GetPostCommmentById(postCommentId);

            if (postComment == null)
                return NotFound(new { result = "post_comment_not_found" });

            _postCommentRepository.RemovePostComment(postComment);

            return Ok(new { result = "post_unliked" });
        }
    }
}
