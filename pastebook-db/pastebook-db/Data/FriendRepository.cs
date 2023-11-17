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

        public void RequestFriend(FriendRequest req) 
        {
            _context.FriendRequests.Add(req);
            _context.SaveChanges();
        }

        public FriendRequest GetFriendRequest(int id)
        {
            return _context.FriendRequests.FirstOrDefault(u => u.Id == id);
        }

        public void AddedFriend(Friend addFriend, FriendRequest req)
        {
            _context.Friends.Add(addFriend);
            _context.SaveChanges();
            _context.Remove(req);
            _context.SaveChanges();
        }


    }
}
