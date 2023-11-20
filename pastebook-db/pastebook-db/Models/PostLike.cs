namespace pastebook_db.Models
{
    public class PostLike
    {
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }

        // Foreign Key
        public int PostId { get; set; }
        public virtual Post Post { get; set; } = null!;

        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
    }
}
