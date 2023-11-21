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

        public User GetUserById(int id)
        {
            return _context.Users.Find(id);
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(f => f.Email == email);
        }

        public List<User> GetAllUsers() 
        {
            return _context.Users.ToList();
        }

        //edit 
        public bool UpdateUser(User user, bool emailIsEditted)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            var hasSent = true;
            if (emailIsEditted)
            {
                string emailBody = @$"
                <html><body><b>New email Address!</b></br><p>Hey {user.FirstName} {user.LastName}. You have changed your email address, kindly use this email when accessing Pastebok.</p><p> See you in Pastebook :D</p></body></html>";

                hasSent = SendEmail(user.Email, emailBody);
            }

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
