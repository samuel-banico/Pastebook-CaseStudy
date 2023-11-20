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

        // Friend
        public Friend? GetFriendById(int userId)
        {
            var friend = _context.Friends.FirstOrDefault(x => x.UserId == userId || x.User_FriendId == userId);

            return friend;
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
