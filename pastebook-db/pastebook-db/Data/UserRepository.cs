using Microsoft.EntityFrameworkCore;
using pastebook_db.Models;
using System.Drawing;
using System.Net.Mail;
using System.Net;

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

        public User GetUserById(int id)
        {
            return _context.Users.Find(id);
        }

        //edit 
        public void UpdateUser(User user, bool emailIsEditted)
        {
            var existingEntity = _context.Set<User>().Local.SingleOrDefault(e => e.Id == user.Id);
            if (existingEntity != null)
            {
                _context.Entry(existingEntity).State = EntityState.Detached;
            }

            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            if (emailIsEditted)
                SendEmail();
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
        public void SendEmail()
        {
            //Send email

            string fromEmail = "aira.sumagui@pointwest.com.ph";
            string fromPassword = "epecptxartgldeas";

            MailMessage msg = new MailMessage();
            msg.From = new MailAddress(fromEmail);
            msg.Subject = "Test subject.";
            msg.To.Add(new MailAddress("sumaguiairamae@gmail.com"));
            msg.Body = "<html><body>test body</body></html>";
            msg.IsBodyHtml = true;

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromEmail, fromPassword),
                EnableSsl = true
            };
            smtpClient.Send(msg);
        }
    }
}
