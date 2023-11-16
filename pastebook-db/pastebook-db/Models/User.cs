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
}
