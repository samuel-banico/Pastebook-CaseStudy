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
            var users = getAllUser().Where(u => u.FirstName.ToLower().Contains(toSearch.ToLower()) || u.LastName.ToLower().Contains(toSearch.ToLower()) || $"{u.FirstName.ToLower()} {u.LastName.ToLower()}".Contains(toSearch.ToLower())).Take(5).ToList();

            return users;
        }
    }

}
