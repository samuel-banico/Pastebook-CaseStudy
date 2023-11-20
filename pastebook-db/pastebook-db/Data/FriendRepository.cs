using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class FriendRepository
    {
        private readonly PastebookContext _context;

        public FriendRepository(PastebookContext context)
        {
            _context = context;
        }
        
        // --- Friend Request
        public void RequestFriend(FriendRequest req) 
        {
            _context.FriendRequests.Add(req);
            _context.SaveChanges();
        }

        public FriendRequest GetFriendRequest(int id)
        {
            return _context.FriendRequests.FirstOrDefault(u => u.Id == id);
        }

        public List<FriendRequest> GetAllFriendRequest(int id)
        {
            return _context.FriendRequests.Where(r => r.UserId == id || r.User_FriendId == id).ToList();
        }

        // Friend
        public Friend? GetFriendById(int friendId)
        {
            var friend = _context.Friends.FirstOrDefault(x => x.UserId == friendId || x.User_FriendId == friendId);

            return friend;
        }

        public Friend? GetFriendByTwoId(int userId, int friendId)
        {
            var friend = _context.Friends.FirstOrDefault(x => (x.UserId == friendId && x.User_FriendId == userId) || (x.User_FriendId == friendId && x.UserId == userId));

            return friend;
        }

        public List<Friend> GetAllFriends(int userId)
        {
            var friend = _context.Friends.Where(f => f.UserId == userId).ToList();

            return friend;
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

            _context.Remove(req);
            _context.SaveChanges();
        }

        public void UpdateFriend(Friend friend)
        {
            _context.Entry(friend).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteFriend(Friend friend)
        {
            _context.Friends.Remove(friend);
                _context.SaveChanges();
        }
    }
}
