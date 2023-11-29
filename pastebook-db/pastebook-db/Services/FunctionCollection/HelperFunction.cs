﻿using System.Net.Mail;
using System.Net;

namespace pastebook_db.Services.FunctionCollection
{
    public class HelperFunction
    {
        /*private readonly IWebHostEnvironment _environment;

        public HelperFunction(IWebHostEnvironment environment)
        {
            _environment = environment;
        }*/

        public static string? SendImageToAngular(string? filePath)
        {
            if (filePath == null)
                return null;

            byte[] imageData = System.IO.File.ReadAllBytes(filePath);

            return $"data:image/png;base64,{Convert.ToBase64String(imageData)}";
        }

        public static string SaveImageToLocalStorage(IFormFile? file)
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

        public static bool RemoveImageFromLocalStorage(string filePath)
        {
            //var fullPath = Path.Combine(_environment.WebRootPath, filePath);

            var fullPath = filePath;

            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
                return true;
            }

            return false;
        }

        //Method for Sending email
        public static bool SendEmail(string email, string emailBody)
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

        public static string TimeDifference(double seconds) 
        {
            if (seconds / 31536000 >= 2)
                return $"{(int)(seconds / 31536000)} years";
            else if (seconds / 31536000 >= 1)
                return $"{(int)(seconds / 31536000)} year";
            else if (seconds / 2629746 >= 2)
                return $"{(int)(seconds / 2629746)} monhts";
            else if (seconds / 2629746 >= 1)
                return $"{(int)(seconds / 2629746)} month";
            else if (seconds / 604800 >= 2)
                return $"{(int)(seconds / 604800)} weeks";
            else if (seconds / 604800 >= 1)
                return $"{(int)(seconds / 604800)} week";
            else if (seconds / 86400 >= 2)
                return $"{(int)(seconds / 86400)} days";
            else if (seconds / 86400 >= 1)
                return $"{(int)(seconds / 86400)} day";
            else if (seconds / 3600 >= 2)
                return $"{(int)(seconds / 3600)} hours";
            else if (seconds / 3600 >= 1)
                return $"{(int)(seconds / 3600)} hour";
            else if (seconds / 60 >= 2)
                return $"{(int)(seconds / 3600)} minutes";
            else if (seconds / 60 >= 1)
                return $"{(int)(seconds / 3600)} minute";
            else if (seconds >= 2)
                return $"{(int)(seconds)} seconds";

            return $"{(int)(seconds)} second";
        }
    }
}