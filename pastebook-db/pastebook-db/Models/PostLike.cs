namespace pastebook_db.Models
{
    public class PostLike
    {
        public int Id { get; set; }
        
        // Foreign Key
        public int PostId { get; set; }
        public virtual Post Post { get; set; } = null!;
        public int User_FriendId { get; set; }
        public virtual User User_Friend { get; set; } = null!;
    }
}
