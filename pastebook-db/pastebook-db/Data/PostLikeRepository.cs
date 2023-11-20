using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class PostLikeRepository
    {
        private readonly PastebookContext _context;

        public PostLikeRepository(PastebookContext context)
        {
            _context = context;
        }

        public PostLike GetPostLikeById(int postLikeId)
        {
            return _context.PostLikes.FirstOrDefault(pL => pL.Id == postLikeId);
        }


        public List<PostLike> GetAllPostLikes()
        {
            return _context.PostLikes.ToList();
        }

        public void CreatePostLike(PostLike postLike)
        {
            _context.PostLikes.Add(postLike);
            _context.SaveChanges();
        }

        public void RemovePostLike(PostLike postLike)
        {
            _context.PostLikes.Remove(postLike);
            _context.SaveChanges();
        }
    }
}
