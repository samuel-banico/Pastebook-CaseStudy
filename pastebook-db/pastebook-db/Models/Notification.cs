namespace pastebook_db.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public bool HasSeen { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Content { get; set; } = null!;

        // Foreign Key
        // user to receive the notification
        public int? UserId { get; set; }
        public virtual User? User { get; set; }

        // Notifications they will receive
        public int? PostId { get; set; }
        public virtual Post? Post { get; set; }
        public int? AlbumId { get; set; }
        public virtual Album? Album { get; set; }
    }

    public class Notification_FriendRequestDTO
    {
        public bool HasSeen { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Content { get; set; } = null!;
        public int FriendRequestId { get; set; }
    }

    public class Notification_PostDTO
    {
        public bool HasSeen { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Content { get; set; } = null!;
        public int PostId { get; set; }
        public int FriendId { get; set; }
    }

    public class Notification_AlbumDTO
    {
        public bool HasSeen { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Content { get; set; } = null!;
        public int AlbumId { get; set; }
        public int FriendId { get; set; }
    }
}
