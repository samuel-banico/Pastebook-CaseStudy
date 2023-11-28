﻿using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;

namespace pastebook_db.Data
{
    public class FriendRepository
    {
        private readonly PastebookContext _context;
        private readonly FriendRequestRepository _friendRequestRepository;

        public FriendRepository(PastebookContext context, FriendRequestRepository friendRequestRepository)
        {
            _context = context;
            _friendRequestRepository = friendRequestRepository;
        }

        // Friend table
        public Friend? GetFriendship(Guid userId, Guid friendId)
        {
            var friend = _context.Friends.FirstOrDefault(x => (x.UserId == friendId && x.User_FriendId == userId) || (x.User_FriendId == friendId && x.UserId == userId));

            return friend;
        }

        // List of all friends but does not contain their user details
        public List<Friend> GetAllFriends(Guid userId)
        {
            var friendList = _context.Friends.Where(f => f.UserId == userId || f.User_FriendId == userId).ToList();

            return friendList;
        }
        
        // List of all friends which also contain their user details
        public List<User> GetAllUserFriends(Guid userId)
        {
            var friendList = _context.Friends.Where(f => f.UserId == userId || f.User_FriendId == userId).ToList();

            var friendUserList = new List<User>();

            Guid? friendId;
            foreach (var friend in friendList) 
            {
                if (friend.UserId != userId)
                    friendId = friend.UserId;
                else
                    friendId = friend.User_FriendId;

                friendUserList.Add(_context.Users.Find(friendId));
            }

            return friendUserList;
        }

        public List<Friend> GetAllBlockedFriends(Guid userId)
        {
            var blockedFriends = _context.Friends.Where(b => b.UserId == userId && b.IsBlocked == true).ToList();

            return blockedFriends;
        }

        public void UpdateFriend(Friend friend)
        {
            _context.Entry(friend).State = EntityState.Modified;
            _context.SaveChanges();
        }

        // To be edited -> removes all table relations or change OnDelete
        public void DeleteFriend(Friend friend)
        {
            _context.Friends.Remove(friend);
            _context.SaveChanges();
        }


        public UserSendDTO ConvertUserToUserSendDTO(User user)
        {
            var userDTO = new UserSendDTO()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.Password,
                Birthday = user.Birthday.ToString("yyyy-MM-dd"),
                Gender = (int)user.Gender,
                UserBio = user.UserBio,
                MobileNumber = user.MobileNumber,
                ViewPublic = user.viewPublicPost,


            };

            if (File.Exists(user.ProfilePicture))
            {
                userDTO.ProfilePicture = HelperFunction.SendImageToAngular(user.ProfilePicture);
            }
            else
            {
                userDTO.ProfilePicture = HelperFunction.SendImageToAngular(Path.Combine("wwwroot", "images", "default.png"));
            }

            if (user.FriendList != null)
            {
                var allFriends = GetAllUserFriends(user.Id);
                userDTO.FriendCount = allFriends.Count;

                var allFriendDTO = new List<UserSendDTO>();
                foreach (var friend in allFriends) 
                {
                    allFriendDTO.Add(ConvertFriendToUserSendDTO(friend));
                }

                userDTO.Friends = allFriendDTO;
            }
            else
            {
                userDTO.FriendCount = 0;
                userDTO.Friends = new List<UserSendDTO>();
            }


            return userDTO;
        }

        public UserSendDTO ConvertFriendToUserSendDTO(User user)
        {
            var userDTO = new UserSendDTO()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.Password,
                Birthday = user.Birthday.ToString("yyyy-MM-dd"),
                Gender = (int)user.Gender,
                UserBio = user.UserBio,
                MobileNumber = user.MobileNumber,
                ViewPublic = user.viewPublicPost,


            };

            if (File.Exists(user.ProfilePicture))
            {
                userDTO.ProfilePicture = HelperFunction.SendImageToAngular(user.ProfilePicture);
            }
            else
            {
                userDTO.ProfilePicture = HelperFunction.SendImageToAngular(Path.Combine("wwwroot", "images", "default.png"));
            }

            return userDTO;
        }

        public FriendRequestDTO ConvertFriendRequestToDTO(FriendRequest friendRequest)
        {
            FriendRequestDTO newFriend = new();
            newFriend.Id = friendRequest.Id;
            newFriend.UserId = friendRequest.UserId;
            newFriend.User_FriendId = friendRequest.User_FriendId;
            newFriend.User_Friend = ConvertUserToUserSendDTO(friendRequest.User_Friend);

            TimeSpan timeDiff = DateTime.Now - friendRequest.CreatedOn;
            newFriend.CreatedOn = timeDiff.ToString();

            return newFriend;
        }
    }
}
