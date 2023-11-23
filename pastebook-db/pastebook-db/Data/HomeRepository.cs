using pastebook_db.Database;
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

        public List<User> GetSearchedUser(string toSearch)
        {
            var users = getAllUser()
                    .Where( u =>
                    ($"{u.FirstName} {u.LastName}").Contains(toSearch, StringComparison.OrdinalIgnoreCase))
                    .Take(5)
                    .ToList();

            return users;
        }
    }

}
