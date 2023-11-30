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
        private readonly UserRepository _userRepository;
        private readonly FriendRepository _friendRepository;

        public PostController(PostRepository postRepository, NotificationRepository notificationRepository, UserRepository userRepository, FriendRepository friendRepository)
        {
            _postRepository = postRepository;
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
            _friendRepository = friendRepository;
        }

        [HttpGet]
        public ActionResult<PostDTO> GetPostById(Guid postId)
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            var post = _postRepository.GetPostById(postId);
            
            if(post == null)
                return NotFound(new { result = "no_post" });

            var postDto = _postRepository.ConvertPostToPostDTO(post, user.Id);

            return Ok(postDto);
        }

        [HttpGet("ownUserTimeline")]
        public ActionResult<List<PostDTO>> GetUserTimeline()
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            List<Post>? postList = _postRepository
                .GetAllPostOfUserTimeline(user.Id);

            if (postList == null || postList.Count == 0)
                return Ok(new { result = "no_post" });

            var userTimeline = new List<PostDTO>();
            foreach (var post in postList) 
            {
                var postDto = _postRepository.ConvertPostToPostDTO(post, user.Id);

                userTimeline.Add(postDto);
            }

            return Ok(userTimeline);
        }

        [HttpGet("otherUserTimeline")]
        public ActionResult<List<Post>> GetOtherUserTimeline()
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);
            var retrievedUser = Request.Query["retrievedUserId"];
            Guid retrievedUserId = Guid.Parse(retrievedUser);

            var postList = _postRepository.GetAllPostOfOtherTimeline(retrievedUserId, user.Id);

            if (postList.Count == 0)
                return Ok(new { result = "no_post" });

            var otherTimeline = new List<PostDTO>();
            foreach (var post in postList)
            {
                var postDto = _postRepository.ConvertPostToPostDTO(post, user.Id);

                otherTimeline.Add(postDto);
            }

            return Ok(otherTimeline);
        }

        //Get all posts by user and friends
        [HttpGet("allPostsOfFriends")]
        public ActionResult<List<PostDTO>> GetAllPostsOfFriends()
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return NotFound(new { result = "no_user"});

            List<Post> friendsPosts = new();
            if (user.ViewPublicPost)
                friendsPosts = _postRepository.GetAllPublicPosts();
            else
                friendsPosts = _postRepository.GetAllPostOfFriends(user.Id);

            friendsPosts.AddRange(_postRepository.GetAllPrivatePostOfUser(user.Id));

            if (friendsPosts == null)
                return NotFound(new { result = "no_post" });

            var feed = new List<PostDTO>();

            foreach (var post in friendsPosts) 
            {
                var postDto = _postRepository.ConvertPostToPostDTO(post, user.Id);

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
            };

            // Set FriendId based on the logic you need
            if (addPost.FriendId != null)
            {
                var friend = _friendRepository.GetFriendById(addPost.FriendId);
                newPost.FriendId = friend.Id;

            }

            _postRepository.CreatePost(newPost);

            if (addPost.FriendId != null)
            _notificationRepository.CreateNotifFromFriendPostInTimeline(newPost);

            return Ok(new { result = "new_post"});
        }

        [HttpPut]
        public ActionResult<Post> UpdatePost(Guid postId, PostDTO newPost) 
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
        public ActionResult<Post> DeletePost(Guid postId) 
        {
            var postToDelete = _postRepository.GetPostById(postId);

            if (postToDelete == null)
                return NotFound(new { result = "post_does_not_exist"});

            _postRepository.DeletePost(postToDelete);

            return Ok(new { result = "post_deleted" });
        }
    }
}
