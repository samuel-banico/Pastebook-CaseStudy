using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class AlbumImageRepository
    {
        private readonly PastebookContext _context;

        // Album Images
        public async void CreateAlbumImage(int albumId, IFormFile image)
        {
            await using var memoryStream = new MemoryStream();
            image.CopyTo(memoryStream);

            var newAlbumImage = new AlbumImage
            {
                Image = memoryStream.ToArray(),
                AlbumId = albumId
            };

            _context.AlbumImages.Add(newAlbumImage);
            await _context.SaveChangesAsync();
        }
    }
}
