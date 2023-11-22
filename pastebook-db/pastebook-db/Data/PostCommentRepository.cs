using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class PostCommentRepository
    {
        private readonly PastebookContext _context;

        public PostCommentRepository(PastebookContext context)
        {
            _context = context;
        }
            
        public PostComment GetPostCommmentById(Guid postCommentId)
        {
            return _context.PostComments.FirstOrDefault(pC => pC.Id == postCommentId);
        }

        public List<PostComment> GetAllPostComments() 
        {
            return _context.PostComments.ToList();
        }

        public void CreatePostComment(PostComment postComment)
        {
            _context.PostComments.Add(postComment);
            _context.SaveChanges();
        }

        public void UpdatePostComment(PostComment postComment)
        {
            _context.Entry(postComment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void RemovePostComment(PostComment postComment)
        {
            _context.PostComments.Remove(postComment);
            _context.SaveChanges();
        }

    }
}
