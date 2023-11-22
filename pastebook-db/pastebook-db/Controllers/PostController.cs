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

        [HttpGet("postById")]
        public ActionResult<PostDTO> GetPostById(int postId)
        {
            var post = _postRepository.GetPostById(postId);
            
            if(post == null)
                return NotFound(new { result = "no_post" });

            var postDto = _postRepository.ConvertPostToPostDTO(post);

            return Ok(postDto);
        }

        [HttpGet("ownUserTimeline")]
        public ActionResult<List<PostDTO>> GetUserTimeline(int userId)
        {
            var postList = _postRepository.GetAllPostOfUserTimeline(userId);

            if (postList.Count == 0)
                return Ok(new { result = "no_post" });

            var userTimeline = new List<PostDTO>();
            foreach (var post in postList) 
            {
                var postDto = _postRepository.ConvertPostToPostDTO(post);

                userTimeline.Add(postDto);
            }

            return Ok(userTimeline);
        }

        [HttpGet("otherUserTimeline")]
        public ActionResult<List<Post>> GetOtherUserTimeline(int retrievedUserId, int loggedUserId)
        {
            var postList = _postRepository.GetAllPostOfOtherTimeline(retrievedUserId, loggedUserId);

            if (postList.Count == 0)
                return Ok(new { result = "no_post" });

            var otherTimeline = new List<PostDTO>();
            foreach (var post in postList)
            {
                var postDto = _postRepository.ConvertPostToPostDTO(post);

                otherTimeline.Add(postDto);
            }

            return Ok(otherTimeline);
        }

        //Get all posts by user and friends
        [HttpGet("allPostsOfFriends")]
        public ActionResult<List<PostDTO>> GetAllPostsOfFriends(int userId)
        {
            var friendsPosts = _postRepository.GetAllPostOfFriends(userId);

            if (friendsPosts == null)
                return NotFound(new { result = "no_post" });

            var feed = new List<PostDTO>();

            foreach (var post in friendsPosts) 
            {
                var postDto = _postRepository.ConvertPostToPostDTO(post);

                feed.Add(postDto);
            }

            return Ok(feed);
        }

        [HttpPost]
        public ActionResult<Post> CreatePost([FromBody]PostReceiveDTO addPost)
        {
            var newPost = new Post
            {
                Content = addPost.Content,
                IsPublic = addPost.IsPublic,
                IsEdited = false,
                CreatedOn = DateTime.Now,

                UserId = addPost.UserId,
                FriendId = addPost.FriendId
            };

            _postRepository.CreatePost(newPost);

            if (addPost.FriendId != null)
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

        // editing
        [HttpDelete]
        public ActionResult<Post> DeletePost(int postId) 
        {
            var postToDelete = _postRepository.GetPostById(postId);

            if (postToDelete == null)
                return NotFound(new { result = "post_does_not_exist"});

            _postRepository.DeletePost(postToDelete);

            return Ok(new { result = "post_deleted" });
        }
    }
}
