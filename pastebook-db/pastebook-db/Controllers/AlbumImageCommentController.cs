using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [Route("api/albumImageComment")]
    [ApiController]
    public class AlbumImageCommentController : ControllerBase
    {
        private readonly AlbumImageCommentRepository _albumImageCommentRepository;
        private readonly NotificationRepository _notificationRepository;

        public AlbumImageCommentController(AlbumImageCommentRepository albumImageCommentRepository, NotificationRepository notificationRepository)
        {
            _albumImageCommentRepository = albumImageCommentRepository;
            _notificationRepository = notificationRepository;
        }

        [HttpGet]
        public ActionResult<AlbumImageComment> GetAlbumImageCommentById(int id)
        {
            var albumImageComment = _albumImageCommentRepository.GetAlbumImageCommmentById(id);

            if (albumImageComment == null)
                return NotFound(new { result = "no_albumImage_comment" });

            return Ok(albumImageComment);
        }

        [HttpGet("allAlbumImageComments")]
        public ActionResult<AlbumImageComment> GetAllAlbumImageComments(int id)
        {
            var albumImageComment = _albumImageCommentRepository.GetAllAlbumImageComments();

            if (albumImageComment == null)
                return NotFound(new { result = "no_albumImage_comment" });

            return Ok(albumImageComment);
        }

        [HttpPut("commentAlbumImage")]
        public ActionResult<AlbumImageComment> CommentAlbumImage(int albumImageId, int loggedUserId, string comment)
        {
            var albumImageComment = new AlbumImageComment
            {
                AlbumImageId = albumImageId,
                UserId = loggedUserId,
                Comment = comment,
                CreatedOn = DateTime.Now,
                IsEdited = false
            };

            _albumImageCommentRepository.CreateAlbumImageComment(albumImageComment);

            _notificationRepository.CreateNotifAlbumImageComment(albumImageComment);

            return Ok(new { result = "albumImage_liked" });
        }

        [HttpPut("edittedCommentAlbumImage")]
        public ActionResult<AlbumImageComment> EditCommentAlbumImage(int albumImageCommentId, string comment)
        {
            var albumImageComment = _albumImageCommentRepository.GetAlbumImageCommmentById(albumImageCommentId);

            if (albumImageComment == null)
                return NotFound(new { result = "albumImage_comment_not_found" });

            albumImageComment.Comment = comment;
            albumImageComment.IsEdited = true;
            albumImageComment.CreatedOn = DateTime.Now;

            _albumImageCommentRepository.UpdateAlbumImageComment(albumImageComment);

            return Ok(new { result = "albumImage_comment_edited" });
        }

        //unfinished
        [HttpPut("uncommentAlbumImage")]
        public ActionResult<AlbumImageComment> UncommentAlbumImage(int albumImageCommentId)
        {
            var albumImageComment = _albumImageCommentRepository.GetAlbumImageCommmentById(albumImageCommentId);

            if (albumImageComment == null)
                return NotFound(new { result = "albumImage_comment_not_found" });

            _albumImageCommentRepository.RemoveAlbumImageComment(albumImageComment);

            return Ok(new { result = "albumImage_uncomment" });
        }
    }
}
