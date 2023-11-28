using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
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

        public List<FriendRequest> GetAllFriendRequest(Guid id)
        {
            return _context.FriendRequests.Where(r => r.User_FriendId == id).ToList();    
        }
         
        public void RequestFriend(FriendRequest req)
        {
            _context.FriendRequests.Add(req);
            _context.SaveChanges();
        }

        public FriendRequest? GetFriendRequest(Guid id)
        {
            return _context.FriendRequests.FirstOrDefault(u => u.Id == id);
        }

        public void DeleteFriendRequest(Guid friendRequestId) 
        {
            var rejectRequest = _context.FriendRequests.Find(friendRequestId);

            if (rejectRequest != null)
            {
                _context.FriendRequests.Remove(rejectRequest);
                _context.SaveChanges();
            }
        }
    }
}
