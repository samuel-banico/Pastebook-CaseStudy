using Microsoft.EntityFrameworkCore;
using pastebook_db.Models;
using System.Drawing;
using System.Net.Mail;
using System.Net;
using pastebook_db.Database;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace pastebook_db.Data
{
    public class UserRepository
    {
        private readonly PastebookContext _context;
        private readonly IWebHostEnvironment _environment;

        public UserRepository(PastebookContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
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

        // --- HELPER METHODS
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
                ProfilePicture = SendImageToAngular(user.ProfilePicture)
            };

            return userDTO;
        }

        public string? SendImageToAngular(string? filePath) 
        {
            if (filePath == null)
                return null;

            byte[] imageData = System.IO.File.ReadAllBytes(filePath);

            return $"data:image/png;base64,{Convert.ToBase64String(imageData)}";
        }

        public string SaveImageToLocalStorage(IFormFile? file) 
        {
            string fileName;
            string filePath = Path.Combine("wwwroot", "images");

            if (file == null)
            {
                fileName = "default.png";
                filePath = Path.Combine(filePath, fileName);
            }
            else
            {
                fileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
                filePath = Path.Combine(filePath, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                    file.CopyTo(fileStream);
            }

            return filePath;
        }

        public bool RemoveImageFromLocalStorage(string filePath) 
        {
            var fullPath = Path.Combine(_environment.WebRootPath, filePath);

            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
                return true;
            }

            return false;
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

            bool isEmailSent = true;

            smtpClient.SendCompleted += (sender, e) =>
            {
                if (e.Error != null)
                    isEmailSent = false;
                else if (e.Cancelled)
                    isEmailSent = false;
            };

            try
            {
                smtpClient.Send(msg);
            }
            catch (Exception)
            {
                isEmailSent = false;
            }

            return isEmailSent;
        }
    }
}
