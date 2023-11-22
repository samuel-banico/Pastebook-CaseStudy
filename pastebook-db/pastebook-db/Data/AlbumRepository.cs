using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class AlbumRepository
    {
        private readonly PastebookContext _context;
        private readonly FriendRepository _friendRepository; 

        public AlbumRepository(PastebookContext context)
        {
            _context = context;
        }

        public Album? GetAlbumById(int id)
        {
            return _context.Albums
                .Include(a => a.AlbumImageList)
                    .ThenInclude(aL => aL.AlbumImageLikesList)
                .Include(a => a.AlbumImageList)
                    .ThenInclude(aC => aC.AlbumImageCommentsList)
                .FirstOrDefault(p => p.Id == id);
        }

        public List<Album>? GetAllAlbumByOwner(int userId)
        {
            return _context.Albums
                        .Include(a => a.AlbumImageList)
                        .ThenInclude(aL => aL.AlbumImageLikesList)
                        .Include(a => a.AlbumImageList)
                        .ThenInclude(aC => aC.AlbumImageCommentsList)
                        .Where(p => p.UserId == userId)
                        .ToList();
        }

        public List<Album> GetAllAlbumByOther(int retrievedUserId, int loggedUserId)
        {
            var isFriend = _friendRepository.GetFriendship(retrievedUserId, loggedUserId);

            if (isFriend != null)
                return GetAllAlbumByOwner(retrievedUserId);

            return _context.Albums
                        .Include(a => a.AlbumImageList)
                        .ThenInclude(aL => aL.AlbumImageLikesList)
                        .Include(a => a.AlbumImageList)
                        .ThenInclude(aC => aC.AlbumImageCommentsList)
                        .Where(p => p.UserId == retrievedUserId && p.IsPublic == true)
                        .ToList();
        }

        public void CreateAlbum(Album album)
        {
            _context.Albums.Add(album);
            _context.SaveChanges();
        }

        public void UpdateAlbum(Album album)
        {
            _context.Entry(album).State = EntityState.Modified;
            _context.SaveChanges();
        }

        // To be edit
        public void DeleteAlbum(Album album)
        {
            _context.Albums.Remove(album);
            _context.SaveChanges();
        }

        // HELPER METHODS
        public AlbumDTO ConvertAlbumToAlbumDTO(Album album)
        {
            var albumDTO = new AlbumDTO()
            {
                Id = album.Id,
                AlbumName = album.AlbumName,
                AlbumDescription = album.AlbumDescription,
                IsPublic = album.IsPublic,
                IsEdited = album.IsEdited,
                CreatedOn = album.CreatedOn.ToString(),
                CoverAlbumImage = album.CoverAlbumImage,

                UserId = album.UserId,
                //ImageList = album.AlbumImageList
            };

            return albumDTO;
        }
    }
}
