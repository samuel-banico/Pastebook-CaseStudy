using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class FriendRepository
    {
        private readonly PastebookContext _context;
        private readonly FriendRequestRepository _friendRequestRepository;

        public FriendRepository(PastebookContext context)
        {
            _context = context;
        }

        public Friend? GetFriendship(int userId, int friendId)
        {
            var friend = _context.Friends.FirstOrDefault(x => (x.UserId == friendId && x.User_FriendId == userId) || (x.User_FriendId == friendId && x.UserId == userId));

            return friend;
        }

        public List<Friend> GetAllFriends(int userId)
        {
            var friendList = _context.Friends.Where(f => f.UserId == userId || f.User_FriendId == userId).ToList();

            return friendList;
        }

        public List<User> GetAllUserFriends(int userId)
        {
            var friendList = _context.Friends.Where(f => f.UserId == userId || f.User_FriendId == userId).ToList();

            var friendUserList = new List<User>();
            
            int? friendId;
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

        public List<Friend> GetAllBlockedFriends(int userId)
        {
            var blockedFriends = _context.Friends.Where(b => b.UserId == userId && b.IsBlocked == true).ToList();

            return blockedFriends;
        }

        public void AddedFriend(Friend addFriend, FriendRequest req)
        {
            _context.Friends.Add(addFriend);
            _context.SaveChanges();

            _friendRequestRepository.DeleteFriendRequest(req);
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
    }
}
