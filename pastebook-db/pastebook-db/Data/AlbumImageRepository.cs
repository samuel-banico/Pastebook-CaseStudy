using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class AlbumImageRepository
    {
        private readonly PastebookContext _context;

        // --- GET
        public AlbumImage? GetAlbumImageById(int id)
        {
            var post = _context.AlbumImages
                        .Include(a => a.AlbumImageLikesList)
                        .Include(a => a.AlbumImageCommentsList)
                        .FirstOrDefault(a => a.Id == id);
            return post;
        }

        public List<AlbumImage> GetAllAlbumImagesByAlbumId(int albumId)
        {
            return _context.AlbumImages
                        .Include(a => a.AlbumImageLikesList)
                        .Include(a => a.AlbumImageCommentsList)
                        .Where(p => p.AlbumId == albumId)
                        .ToList();
        }

        // --- POST
        public async void CreateAlbumImage(AlbumImage albumImage)
        {
            _context.AlbumImages.Add(albumImage);
            await _context.SaveChangesAsync();
        }

        // PUT
        public void UpdateAlbumImage(AlbumImage albumImage)
        {
            _context.Entry(albumImage).State = EntityState.Modified;
            _context.SaveChanges();
        }

        // --- DELETE
        public void DeleteAlbumImage(AlbumImage albumImage)
        {
            _context.AlbumImages.Remove(albumImage);
            _context.SaveChanges();
        }
    }
}
