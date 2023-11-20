namespace pastebook_db.Models
{
    public enum NotifType
    {
        Like, // You will be notified
        Comment, //You will be notified
        FriendRequest, // You will be notified
        FriendAccepted, // Friend will be notified
        FriendPost, // You will be notified
        FriendPostLike, // Friend Posted | Both will be notified
        FriendPostComment, // FrienedPosted | Both will be notified
    }
}
