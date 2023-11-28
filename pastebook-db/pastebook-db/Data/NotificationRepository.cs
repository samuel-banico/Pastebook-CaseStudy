using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class NotificationRepository
    {
        private readonly PastebookContext _context;

        public NotificationRepository(PastebookContext context)
        {
            _context = context;
        }

        // Get All Notifications
        public List<Notification> GetAllNotifications(Guid userId)
        {
            var notif = _context.Notifications
                .Include(n => n.User)
                .Include(n => n.UserRequest)
                .Include(n => n.Post)
                .Include(n => n.Album)
                .Where(n => n.UserId == userId)
                .OrderByDescending(p => p.NotificationDate).ToList();

            return notif;
        }

        // Get Unseen Notification
        public List<Notification> GetUnseenNotifications(Guid userId) 
        {
            var notif = _context.Notifications
                    .Include(n => n.User)
                    .Include(n => n.UserRequest)
                    .Include(n => n.Post)
                    .Include(n=>n.Album)
                    .Where(n => n.UserId == userId && n.HasSeen == false)
                    .OrderByDescending(p => p.NotificationDate)
                    .ToList();
            return notif;
        }


        // Get Seen Notification

        public void SeenNotification(Guid notifId)
        {
            var notif = _context.Notifications.FirstOrDefault(n => n.Id == notifId);

            if (notif != null) 
            {
                notif.HasSeen = true;

                _context.Entry(notif).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }

        // Clear Seen Notifs
        public void ClearNotification(Guid userId)
        {
            var notif = GetUnseenNotifications(userId);

            foreach (var item in notif)
            {
                item.HasSeen = true;

                _context.Entry(item).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }

        // --- Other Methods
        // --- Create Notification
        // Added
        public void CreateNotifFriendRequest(FriendRequest friendRequest)
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;
            newNotif.UserId = friendRequest.User_FriendId;
            newNotif.UserRequestId = friendRequest.UserId;


            var requestedUser = getUserFromFriendRequest(friendRequest);
            newNotif.Content = $"Has sent you a friend request";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }

        // Added
        public void CreateNotifAcceptedFriendRequest(Friend friend)
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;
            newNotif.UserId = friend.UserId;

            var requestedUser = getUserFromFriend(friend);
            newNotif.Content = $"Accepted your friend request";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }

        // Added
        public void CreateNotifFromFriendPostInTimeline(Post post) 
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;
            newNotif.PostId = post.Id;
            newNotif.UserId = post.UserId;

            var friend = getFriendFromPost(post);
            newNotif.Content = $"Has posted on your timeline.";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }

        // Added
        public void CreateNotifPostLike(PostLike postLike)
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;
            newNotif.PostId = postLike.PostId;

            newNotif.UserId = getPostFromPostId(postLike.PostId).UserId;


            var likedUser = getFriendFromPostLike(postLike);
            newNotif.Content = $"Has reacted to your post";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }

        // Added
        public void CreateNotifPostComment(PostComment postComment)
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;
            newNotif.PostId = postComment.PostId;

            newNotif.UserId = getPostFromPostId(postComment.PostId).UserId;
            
            var commentedUser = getFriendFromPostComment(postComment);
            newNotif.Content = $"Has left a comment on your post";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }


        public void CreateNotifAlbumImageLike(AlbumImageLike albumImageLike)
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;

            var album = getAlbumFromAlbumImageId(albumImageLike.AlbumImageId);
            newNotif.AlbumId = album.Id;
            newNotif.UserId = album.UserId;

            var likedUser = getFriendFromAlbumImageLike(albumImageLike);
            newNotif.Content = $"Has reacted on your album.";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }


        public void CreateNotifAlbumImageComment(AlbumImageComment albumImageComment)
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;

            var album = getAlbumFromAlbumImageId(albumImageComment.AlbumImageId);
            newNotif.AlbumId = album.Id;
            newNotif.UserId = album.UserId;

            var commentedUser = getFriendFromAlbumImageComment(albumImageComment);
            newNotif.Content = $"Has left a comment on your album.";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }

        // Helper methods
        private User getUserFromFriendRequest(FriendRequest friendRequest)
        {
            var user = _context.Users
                .FirstOrDefault(f => f.Id == friendRequest.UserId);

            return user;
        }

        private User getUserFromFriend(Friend friend)
        {
            var user = _context.Friends
                            .Include(f => f.User)
                            .FirstOrDefault(f => f.Id == friend.UserId || f.Id == friend.User_FriendId);

            return user.User;
        }

        private User getFriendFromPost(Post post) 
        {
            var friend = _context.Friends
                                .Include(f => f.User_Friend)
                                .FirstOrDefault(f => f.Id == post.FriendId);

            return friend.User_Friend;
        }

        private User getFriendFromPostLike(PostLike postLike) 
        {
            var user = _context.Users
                            .FirstOrDefault(f => f.Id == postLike.UserId);

            return user;
        }

        private User getFriendFromPostComment(PostComment postComment)
        {
            var user = _context.Users
                            .FirstOrDefault(f => f.Id == postComment.UserId);
            return user;
        }

        private User getFriendFromAlbumImageLike(AlbumImageLike albumImageLike)
        {
            var user = _context.Users
                            .FirstOrDefault(f => f.Id == albumImageLike.UserId);
            return user;
        }

        private User getFriendFromAlbumImageComment(AlbumImageComment albumImageComment)
        {
            var user = _context.Users
                            .FirstOrDefault(f => f.Id == albumImageComment.UserId);
            return user;
        }

        private Post getPostFromPostId(Guid postId) 
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == postId);
            return post;
        }

        private Album getAlbumFromAlbumImageId(Guid albumImageId) 
        {
            var albumImage = _context.AlbumImages
                                .Include(a => a.Album)
                                .FirstOrDefault(aI => aI.Id == albumImageId);

            return albumImage.Album;
        }
    }
}
