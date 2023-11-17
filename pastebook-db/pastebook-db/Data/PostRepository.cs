using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class PostRepository
    {
        private readonly PastebookContext _context;
        public PostRepository(PastebookContext context)
        {
            _context = context;
        }

        public Post GetPostById(int id)
        {
            return _context.Posts.FirstOrDefault(p => p.Id == id);
        }

        public void CreatePost(Post post)
        {
            _context.Posts.Add(post);
            _context.SaveChanges();
        }
                
    }
}
