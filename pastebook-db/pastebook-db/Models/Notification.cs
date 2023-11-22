namespace pastebook_db.Models
{
    public class Notification
    {
        public Guid Id { get; set; }
        public bool HasSeen { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Content { get; set; } = null!;

        // Foreign Key
        // user to receive the notification
        public Guid? UserId { get; set; }
        public virtual User? User { get; set; }

        // Notifications they will receive
        public Guid? PostId { get; set; }
        public virtual Post? Post { get; set; }
        public Guid? AlbumId { get; set; }
        public virtual Album? Album { get; set; }
    }

    public class Notification_FriendRequestDTO
    {
        public bool HasSeen { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Content { get; set; } = null!;
        public Guid FriendRequestId { get; set; }
    }

    public class Notification_PostDTO
    {
        public bool HasSeen { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Content { get; set; } = null!;
        public Guid PostId { get; set; }
        public Guid FriendId { get; set; }
    }

    public class Notification_AlbumDTO
    {
        public bool HasSeen { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Content { get; set; } = null!;
        public Guid AlbumId { get; set; }
        public Guid FriendId { get; set; }
    }
}
