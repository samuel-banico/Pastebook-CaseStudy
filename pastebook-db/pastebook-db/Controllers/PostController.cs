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
        
        public PostController(PostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpPost]
        public ActionResult<Post> PostCreate(AddPost addPost, int userId)
        {

            var newPost = new Post
            {
                Content = addPost.Content,
                CreatedOn = DateTime.Now,
                UserId = userId
            };

            _postRepository.CreatePost(newPost);

            return Ok(new { result = "posted"});
        }
    }
}
