using Microsoft.EntityFrameworkCore;
using pastebook_db.Models;
using System.Drawing;
using System.Net.Mail;
using System.Net;
using pastebook_db.Database;

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

        public bool RegisterUser(User user)
        {
            string emailBody = $"<html><body><h6>We’re excited you’ve joined Pastebook!</h6></br><p>Hey {user.FirstName} {user.LastName}. Invite your friends, and share your moments together by using Pastebook!</p></br><p>See you in pastebook :D</p></body></html>";

            if (SendEmail(user.Email, emailBody))
                return false;

            _context.Users.Add(user);
            _context.SaveChanges();

            return true;
        }

        public List<User> GetAllUsers() 
        {
            return _context.Users.ToList();
        }

        public User GetUserById(int id)
        {
            return _context.Users.Find(id);
        }

        //edit 
        public bool UpdateUser(User user, bool emailIsEditted)
        {
            var existingEntity = _context.Set<User>().Local.SingleOrDefault(e => e.Id == user.Id);
            if (existingEntity != null)
            {
                _context.Entry(existingEntity).State = EntityState.Detached;
            }

            var hasSent = true;
            if (emailIsEditted)
            {
                string emailBody = @$"
                <html><body><b>New email Address!</b></br><p>Hey {user.FirstName} {user.LastName}. You have changed your email address, kindly use this email when accessing Pastebok.</p><p> See you in Pastebook :D</p></body></html>";

                hasSent = SendEmail(user.Email, emailBody);
            }

            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            return hasSent;
        }

        public byte[] DefaultImageToByteArray(string imagePath) 
        {
            if (!File.Exists(imagePath))
            {
                Console.WriteLine("File not found: " + imagePath);
                return null;
            }

            // Read all bytes from the image file
            byte[] imageBytes = File.ReadAllBytes(imagePath);

            return imageBytes;
        }

        //Method for Sending email
        public bool SendEmail(string email, string emailBody)
        {
            //Send email
            string fromEmail = "pastebook2023@gmail.com";
            string fromPassword = "Pastebook.123";

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
