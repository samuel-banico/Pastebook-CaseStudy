using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class AccessRepository
    {
        private readonly PastebookContext _context;
        private readonly UserRepository _userRepository;

        public AccessRepository(PastebookContext context, UserRepository userRepository)
        {
            _context = context;
            _userRepository = userRepository;
        }

        public bool RegisterUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();

            string emailBody = $"<html><body><h6>We’re excited you’ve joined Pastebook!</h6></br><p>Hey {user.FirstName} {user.LastName}. Invite your friends, and share your moments together by using Pastebook!</p></br><p>See you in pastebook :D</p></body></html>";

            if (!_userRepository.SendEmail(user.Email, emailBody))
                return false;

            return true;
        }
    }
}
