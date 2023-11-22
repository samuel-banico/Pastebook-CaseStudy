using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class AlbumImageCommentRepository
    {
        private readonly PastebookContext _context;

        public AlbumImageCommentRepository(PastebookContext context)
        {
            _context = context;
        }

        public AlbumImageComment? GetAlbumImageCommmentById(Guid albumImageCommentId)
        {
            return _context.AlbumImageComments.FirstOrDefault(pC => pC.Id == albumImageCommentId);
        }

        public List<AlbumImageComment> GetAllAlbumImageComments()
        {
            return _context.AlbumImageComments.ToList();
        }

        public void CreateAlbumImageComment(AlbumImageComment albumImageComment)
        {
            _context.AlbumImageComments.Add(albumImageComment);
            _context.SaveChanges();
        }

        public void UpdateAlbumImageComment(AlbumImageComment albumImageComment)
        {
            _context.Entry(albumImageComment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void RemoveAlbumImageComment(AlbumImageComment albumImageComment)
        {
            _context.AlbumImageComments.Remove(albumImageComment);
            _context.SaveChanges();
        }
    }
}
