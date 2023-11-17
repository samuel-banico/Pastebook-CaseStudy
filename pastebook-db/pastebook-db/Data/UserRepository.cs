using Microsoft.EntityFrameworkCore;
using pastebook_db.Models;
using System.Drawing;

namespace pastebook_db.Data
{
    public class UserRepository
    {
        private readonly PastebookContext _context;

        public UserRepository(PastebookContext context)
        {
            _context = context;
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(f => f.Email == email);
        }

        public void RegisterUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public List<User> GetAllUsers() 
        {
            return _context.Users.ToList();
        }

        //edit 
        public void UpdateUser(User user)
        {

            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

        }
    }
}
