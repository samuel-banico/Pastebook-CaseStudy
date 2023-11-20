using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class FriendRequestRepository
    {
        private readonly PastebookContext _context;

        public FriendRequestRepository(PastebookContext context)
        {
            _context = context;
        }

        public List<FriendRequest> GetAllFriendRequest(int id)
        {
            return _context.FriendRequests.Where(r => r.UserId == id || r.User_FriendId == id).ToList();
        }

        public void RequestFriend(FriendRequest req)
        {
            _context.FriendRequests.Add(req);
            _context.SaveChanges();
        }

        public FriendRequest GetFriendRequest(int id)
        {
            return _context.FriendRequests.FirstOrDefault(u => u.Id == id);
        }

        public void DeleteFriendRequest(FriendRequest friendRequest) 
        {
            _context.Remove(friendRequest);
            _context.SaveChanges();
        }
    }
}
