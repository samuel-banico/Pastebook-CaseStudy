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

        public string? Token { get; set; }

        public ICollection<Friend>? FriendList { get; set; }
    }

    public class UserRegisterDTO
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
        public string Birthday { get; set; } = null!;

        [Required]
        public int Gender { get; set; }
        public string? MobileNumber { get; set; }
    }

    //Login
    public class UserLoginDTO
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
