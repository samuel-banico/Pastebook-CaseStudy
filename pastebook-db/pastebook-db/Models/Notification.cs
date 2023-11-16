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
        public int? FriendRequestId { get; set; }
        public virtual FriendRequest? FriendRequest { get; set; }
        public int? PostLikeId { get; set; }
        public virtual PostLike? PostLike { get; set; }
        public int? PostCommentId { get; set; }
        public virtual PostComment? PostComment { get; set; }
        public int? AlbumImageLikeId { get; set; }
        public virtual AlbumImageLike? AlbumImageLike { get; set; }
        public int? AlbumCommentId { get; set; }
        public virtual AlbumImageComment? AlbumImageComment { get; set; }
    }
}
