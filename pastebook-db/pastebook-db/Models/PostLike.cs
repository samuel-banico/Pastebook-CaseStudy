namespace pastebook_db.Models
{
    public class PostLike
    {
        public int Id { get; set; }

        // Foreign Key
        public int PostId { get; set; }
        public virtual Post Post { get; set; } = null!;
        public int FriendId { get; set; }
        public virtual Friend Friend { get; set; } = null!;
    }
}
