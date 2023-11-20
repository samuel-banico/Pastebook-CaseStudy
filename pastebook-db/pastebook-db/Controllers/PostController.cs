using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/posts")]
    public class PostController : ControllerBase
    {
        private readonly PostRepository _postRepository;
        private readonly NotificationRepository _notificationRepository;

        public PostController(PostRepository postRepository, NotificationRepository notificationRepository)
        {
            _postRepository = postRepository;
            _notificationRepository = notificationRepository;
        }

        [HttpGet("ownUserTimeline")]
        public ActionResult<List<Post>> OwnUserTimeline(int userId) 
        {
            var postList = _postRepository.GetAllPostByOwner(userId);

            if(postList.Count == 0)
                return Ok(new { result = "no_post" });

            return Ok(new { result = "posted", postList });
        }

        [HttpGet("otherUserTimeline")]
        public ActionResult<List<Post>> OtherUserTimeline(int retrievedUserId, int loggedUserId)
        {
            var postList = _postRepository.GetAllPostByOther(retrievedUserId, loggedUserId);

            if (postList.Count == 0)
                return Ok(new { result = "no_post" });

            return Ok(new { result = "posted", postList });
        }

        [HttpGet]
        public ActionResult<Post> GetPost(int postId)
        {
            var post = _postRepository.GetPostById(postId);

            var newPost = new PostDTO();

            CreatePost(newPost, postId);

            return Ok(new { result = "retrieved successful", post });
        }

        [HttpPost]
        public ActionResult<Post> CreatePost(PostDTO addPost, int userId, int? friendId = null)
        {
            var newPost = new Post
            {
                Content = addPost.Content,
                IsPublic = addPost.IsPublic,

                CreatedOn = DateTime.Now,
                IsEdited = false,
                LikeCount = 0,
                CommentCount = 0,

                UserId = userId,
                FriendId = friendId
            };

            _postRepository.CreatePost(newPost);

            if (friendId != null)
                _notificationRepository.CreateNotifFromFriendPostInTimeline(newPost);

            return Ok(new { result = "new_post"});
        }

        [HttpPut]
        public ActionResult<Post> UpdatePost(int postId, PostDTO newPost) 
        {
            var postToEdit = _postRepository.GetPostById(postId);

            postToEdit.IsPublic = newPost.IsPublic;
            postToEdit.Content = newPost.Content;
            postToEdit.IsEdited = true;
            postToEdit.CreatedOn = DateTime.Now;

            _postRepository.UpdatePost(postToEdit);

            return Ok(new { result = newPost });
        }

        [HttpDelete]
        public ActionResult<Post> DeletePost(int postId) 
        {
            var postToDelete = _postRepository.GetPostById(postId);

            _postRepository.DeletePost(postToDelete);

            return Ok(new { result = "post_deleted" });
        }

        // -- Post Like
        [HttpPut("likePost")]
        public ActionResult<Post> LikedPost(int postId, int loggedUserId)
        {
            var post = _postRepository.GetPostById(postId);
            post.LikeCount++;

            _postRepository.UpdatePost(post);

            var postLike = new PostLike
            {
                PostId = postId,
                FriendId = loggedUserId,
                CreatedOn = DateTime.Now,
            };

            _postRepository.CreatePostLike(postLike);

            _notificationRepository.CreateNotifPostLike(postLike);

            return Ok(new { result = "post_liked" });
        }

        [HttpPut("unlikePost")]
        public ActionResult<Post> UnlikedPost(int postLikeId)
        {
            var postLike = _postRepository.GetPostLikeById(postLikeId);

            if (postLike == null)
                return NotFound(new { result = "post_like_not_found" });

            var post = _postRepository.GetPostById(postLike.PostId);

            if(post == null)
                return NotFound(new { result = "post_not_found" });

            post.LikeCount--;
            _postRepository.UpdatePost(post);

            _postRepository.RemovePostLike(postLike);

            return Ok(new { result = "post_unliked" });
        }

        // -- Post Comment
        [HttpPut("commentPost")]
        public ActionResult<Post> CommentPost(int postId, int loggedUserId, string comment)
        {
            var post = _postRepository.GetPostById(postId);
            post.CommentCount++;

            _postRepository.UpdatePost(post);

            var postComment = new PostComment
            {
                PostId = postId,
                FriendId = loggedUserId,
                Comment = comment,
                CreatedOn = DateTime.Now,
                IsEdited = false
            };

            _postRepository.CreatePostComment(postComment);

            _notificationRepository.CreateNotifPostComment(postComment);

            return Ok(new { result = "post_liked" });
        }

        [HttpPut("edittedCommentPost")]
        public ActionResult<Post> EditCommentPost(int postCommentId, string comment)
        {
            var postComment = _postRepository.GetPostCommmentById(postCommentId);

            if (postComment == null)
                return NotFound(new { result = "post_comment_not_found" });
            
            postComment.Comment = comment;
            postComment.IsEdited = true;
            postComment.CreatedOn = DateTime.Now;

            _postRepository.UpdatePostComment(postComment);

            return Ok(new { result = "post_comment_editted" });
        }

        //unfinished
        [HttpPut("uncommentPost")]
        public ActionResult<Post> UncommentPost(int postCommentId)
        {
            var postComment = _postRepository.GetPostCommmentById(postCommentId);

            if (postComment == null)
                return NotFound(new { result = "post_comment_not_found"});

            var post = _postRepository.GetPostById(postComment.PostId);

            if (post == null)
                return NotFound(new { result = "post_not_found" });

            post.CommentCount--;
            _postRepository.UpdatePost(post);

            _postRepository.RemovePostComment(postComment);

            return Ok(new { result = "post_unliked" });
        }

        //Get all the post comments
        [HttpGet("getAllPostComments")]
        public ActionResult<PostComment> GetAllPostComments(int postId)
        {
            var post = _postRepository.GetAllPostCommentsByPostId(postId);

            return Ok(new { result = "retrieved successful", post });
        }


        //Get all post likes
        [HttpGet("getAllLikesInPost")]
        public ActionResult<PostComment> GetAllLikesInPost(int postId)
        {
            var post = _postRepository.GetAllPostLikesByPostId(postId);

            return Ok(new { result = "retrieved successful", post });
        }

        //Get all posts by user and friends
        [HttpGet("getAllPostsOfFriends")]
        public ActionResult<List<Post>> GetAllPostsOfFriends(int userId)
        {
            var friendsPosts = _postRepository.GetAllPostByUserAndFriends(userId);

            if (friendsPosts == null)
            {
                return Ok(new { result = "no post"});
            }

            return Ok(new { result = "retrieved successful", friendsPosts });
        }
    }
}
