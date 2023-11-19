using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class AlbumRepository
    {
        readonly PastebookContext _context;

        public AlbumRepository(PastebookContext context)
        {
            _context = context;
        }

        public Album? GetAlbumById(int id)
        {
            return _context.Albums.FirstOrDefault(p => p.Id == id);
        }

        public List<Album> GetAllAlbumByOwner(int userId)
        {
            return _context.Albums.Where(p => p.UserId == userId).ToList();
        }

        public List<Album> GetAllAlbumByOther(int userId)
        {
            return _context.Albums.Where(p => p.UserId == userId && p.IsPublic == true).ToList();
        }

        public void CreateAlbum(Album album)
        {
            _context.Albums.Add(album);
            _context.SaveChanges();
        }

        public void UpdateAlbum(Album album)
        {
            var existingEntity = _context.Set<Album>().Local.SingleOrDefault(e => e.Id == album.Id);
            if (existingEntity != null)
            {
                _context.Entry(existingEntity).State = EntityState.Detached;
            }

            _context.Entry(album).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteAlbum(Album album)
        {
            var existingEntity = _context.Set<Album>().Local.SingleOrDefault(e => e.Id == album.Id);
            if (existingEntity != null)
            {
                _context.Entry(existingEntity).State = EntityState.Detached;
            }

            _context.Albums.Remove(existingEntity);
            _context.SaveChanges();
        }

        // Album Images
        public async void CreateAlbumImage(int albumId, IFormFile image) 
        {
            await using var memoryStream = new MemoryStream();
            image.CopyTo(memoryStream);

            var newAlbumImage = new AlbumImage
            {
                Image = memoryStream.ToArray(),
                LikeCount = 0,
                CommentCount = 0,
                AlbumId = albumId
            };

            _context.AlbumImages.Add(newAlbumImage);
            await _context.SaveChangesAsync();
        }
    }
}
