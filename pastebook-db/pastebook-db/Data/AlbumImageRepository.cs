using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class AlbumImageRepository
    {
        private readonly PastebookContext _context;

        public AlbumImageRepository(PastebookContext context)
        {
            _context = context;
        }

        // --- GET
        public AlbumImage? GetAlbumImageById(Guid id)
        {
            var post = _context.AlbumImages
                        .Include(a => a.AlbumImageLikesList)
                        .Include(a => a.AlbumImageCommentsList)
                        .FirstOrDefault(a => a.Id == id);
            return post;
        }

        public string? GetFirstPhotoOfAlbum(Guid albumId) 
        {
            var photo = _context.AlbumImages
                        .FirstOrDefault(a => a.AlbumId == albumId);

            if(photo == null)
                return null;

            return photo.Image;
        }

        public List<AlbumImage> GetAllAlbumImagesByAlbumId(Guid albumId)
        {
            return _context.AlbumImages
                        .Include(a => a.AlbumImageLikesList)
                        .Include(a => a.AlbumImageCommentsList)
                        .Where(p => p.AlbumId == albumId)
                        .ToList();
        }

        // --- POST
        public void CreateAlbumImage(AlbumImage albumImage)
        {
            _context.AlbumImages.Add(albumImage);
            _context.SaveChanges();
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
