using Microsoft.EntityFrameworkCore;
using pastebook_db.Models;
using System.Drawing;
using System.Net.Mail;
using System.Net;
using pastebook_db.Database;
using System.IO;

namespace pastebook_db.Data
{
    public class UserRepository
    {
        private readonly PastebookContext _context;

        public UserRepository(PastebookContext context)
        {
            _context = context;
        }

        public User? GetUserById(Guid id)
        {
            return _context.Users.Find(id);
        }

        public User? GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(f => f.Email == email);
        }

        public User? GetUserByToken(string token) 
        {
            var userId = _context.Tokens.FirstOrDefault(t => t.Token == token);

            if (userId == null)
                return null;

            return _context.Users.FirstOrDefault(u => u.Id == userId.UserId);
        }

        public List<User> GetAllUsers() 
        {
            return _context.Users.ToList();
        }

        //edit 
        public bool UpdateUser(User user, bool emailIsEditted)
        {
            bool hasSent = true;
            if (emailIsEditted)
            {
                string emailBody = @$"
                <html><body><b>New email Address!</b></br><p>Hey {user.FirstName} {user.LastName}. You have changed your email address, kindly use this email when accessing Pastebok.</p><p> See you in Pastebook :D</p></body></html>";

                hasSent = SendEmail(user.Email, emailBody);
            }

            if (!hasSent)
                return hasSent;

            var existingEntity = _context.Set<User>().Local.SingleOrDefault(e => e.Id == user.Id);
            if (existingEntity != null)
            {
                _context.Entry(existingEntity).State = EntityState.Detached;
            }

            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            return hasSent;
        }

        // HELPER METHODS
        public UserSendDTO ConvertUserToUserSendDTO(User user) 
        {
            var userDTO = new UserSendDTO()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.Password,
                Birthday = user.Birthday.ToString("yyyy-MM-dd"),
                Gender = (int)user.Gender,
                UserBio = user.UserBio,
                MobileNumber = user.MobileNumber,
                ProfilePicture = $"data:image/png;base64,{Convert.ToBase64String(user.ProfilePicture)}"
            };

            return userDTO;
        }

        public byte[] ImageToByteArray(IFormFile? file) 
        {
            // returns default
            if (file == null)
                return File.ReadAllBytes("wwwroot/images/default_pic.png");

            //
            using var memoryStream = new MemoryStream();
            file.CopyTo(memoryStream);
            byte[] fileData = memoryStream.ToArray();

            return fileData;
        }

        //Method for Sending email
        public bool SendEmail(string email, string emailBody)
        {
            //Send email
            string fromEmail = "pastebook2023@gmail.com";
            string fromPassword = "lrtvwngzwminepyd";

            MailMessage msg = new MailMessage();
            msg.From = new MailAddress(fromEmail);
            msg.Subject = "Welcome to Pastebook";
            msg.To.Add(new MailAddress(email));
            msg.Body = emailBody;
            msg.IsBodyHtml = true;

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromEmail, fromPassword),
                EnableSsl = true
            };

            try
            {
                smtpClient.Send(msg);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
