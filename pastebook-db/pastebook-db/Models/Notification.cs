namespace pastebook_db.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public bool HasSeen { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Content { get; set; } = null!;
        public NotifType NotifType { get; set; }

        // Foreign Key
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public int User_FriendId { get; set; }
        public virtual User User_Friend { get; set; } = null!;
        public int PostId { get; set; }
        public virtual Post Post { get; set; } = null!;
    }
}
