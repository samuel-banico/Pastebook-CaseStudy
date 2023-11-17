using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class HomeRepository
    {
        private readonly PastebookContext _context;

        public HomeRepository(PastebookContext context)
        {
            _context = context;
        }

        public List<User> getAllUser()
        {
            return _context.Users.ToList();
        }
    }

}
