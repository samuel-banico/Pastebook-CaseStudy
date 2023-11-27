﻿using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class AlbumRepository
    {
        private readonly PastebookContext _context;
        private readonly FriendRepository _friendRepository;
        private readonly UserRepository _userRepository;

        public AlbumRepository(PastebookContext context, UserRepository userRepository, FriendRepository friendRepository)
        {
            _context = context;
            _userRepository = userRepository;
            _friendRepository = friendRepository;
        }

        public Album? GetAlbumById(Guid id)
        {
            try
            {
                return _context.Albums
                .Include(a => a.AlbumImageList)
                .ThenInclude(aL => aL.AlbumImageLikesList)
                .Include(a => a.AlbumImageList)
                .ThenInclude(aC => aC.AlbumImageCommentsList)
                .FirstOrDefault(p => p.Id == id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public List<Album>? GetAllAlbumByOwner(Guid userId)
        {
            try
            {
                return _context.Albums
                .Include(a => a.AlbumImageList)
                .Where(p => p.UserId == userId)
                .ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public List<Album> GetAllAlbumByOther(Guid retrievedUserId, Guid loggedUserId)
        {
            var isFriend = _friendRepository.GetFriendship(retrievedUserId, loggedUserId);

            if (isFriend != null)
                return GetAllAlbumByOwner(retrievedUserId);

            return _context.Albums
                .Include(a => a.AlbumImageList)
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
                CreatedOn = album.CreatedOn.ToString("MM-dd-yyyy"),

                UserId = album.UserId,
            };

            if (album.AlbumImageList != null && album.AlbumImageList.Count  > 0) 
            {
                albumDTO.CoverAlbumImage = _userRepository.SendImageToAngular(album.AlbumImageList.First().Image);
                albumDTO.ImageList = album.AlbumImageList;
                albumDTO.ImageCount = album.AlbumImageList.Count;
            }
            else 
            {
                albumDTO.CoverAlbumImage = _userRepository.SendImageToAngular(Path.Combine("wwwroot", "images","default_album.png"));
                albumDTO.ImageList = new List<AlbumImage>();
                albumDTO.ImageCount = 0;
            }

            return albumDTO;
        }
    }
}
