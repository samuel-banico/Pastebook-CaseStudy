using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class AlbumImageLikeRepository
    {
        private readonly PastebookContext _context;

        public AlbumImageLikeRepository(PastebookContext context)
        {
            _context = context;
        }

        public AlbumImageLike? GetAlbumImageLikeById(Guid albumImageLikeId)
        {
            return _context.AlbumImageLikes.FirstOrDefault(pL => pL.Id == albumImageLikeId);
        }

        public List<AlbumImageLike> GetAllAlbumImageLikes()
        {
            return _context.AlbumImageLikes.ToList();
        }

        public void CreateAlbumImageLike(AlbumImageLike postLike)
        {
            _context.AlbumImageLikes.Add(postLike);
            _context.SaveChanges();
        }

        public void RemoveAlbumImageLike(AlbumImageLike postLike)
        {
            _context.AlbumImageLikes.Remove(postLike);
            _context.SaveChanges();
        }
    }
}
