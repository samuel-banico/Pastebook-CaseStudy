using System.ComponentModel.DataAnnotations;

namespace pastebook_db.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateTime Birthday { get; set; }
        public Gender Gender { get; set; }
        public string? MobileNumber { get; set; }
        public byte[] ProfilePicture { get; set; } = null!;
        public bool IsActive { get; set; }
    }

    public class UserRegister
    {
        [Required]
        public string FirstName { get; set; } = null!;

        [Required]
        public string LastName { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;

        [Required]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [DataType(DataType.Date)]
        public DateTime Birthday { get; set; }

        [Required]
        public Gender Gender { get; set; }
        public string? MobileNumber { get; set; }
    }

    //Login
    public class UserLogin
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }
    }
    public class UserLoginResponse
    {
        public string? email { get; set; }
        public bool? isActive { get; set; }
    }
}
