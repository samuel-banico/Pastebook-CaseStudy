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

        public void Friend(Friend addFriend)
        {
            _context.Friends.Add(addFriend);
            _context.SaveChanges();
        }
    }
}
