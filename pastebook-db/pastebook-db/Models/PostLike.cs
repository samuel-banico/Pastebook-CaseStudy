namespace pastebook_db.Models
{
    public class PostLike
    {
        public Guid Id { get; set; }
        public DateTime CreatedOn { get; set; }

        // Foreign Key
        public Guid PostId { get; set; }
        public virtual Post Post { get; set; } = null!;

        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;
    }
}
