using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class PostRepository
    {
        private readonly PastebookContext _context;
        private readonly FriendRepository _friendRepository;
        public PostRepository(PastebookContext context, FriendRepository friendRepository)
        {
            _context = context;
            _friendRepository  = friendRepository;
        }

        public Post? GetPostById(int id)
        {
            return _context.Posts.FirstOrDefault(p => p.Id == id);
        }

        public List<Post> GetAllPostByOwner(int userId)
        {
            return _context.Posts.Where(p => p.UserId == userId).ToList();
        }

        public List<Post> GetAllPostByOther(int retrievedUserId, int loggedUserId)
        {
            var isFriend = GetFriendByTwoUserId(retrievedUserId, loggedUserId);

            if (isFriend != null)
                return _context.Posts.Where(p => p.UserId == retrievedUserId).ToList();

            return _context.Posts.Where(p => p.UserId == retrievedUserId && p.IsPublic == true).ToList();
        }

        public void CreatePost(Post post)
        {
            _context.Posts.Add(post);
            _context.SaveChanges();
        }
        
        public void UpdatePost(Post post) 
        {
            var existingEntity = _context.Set<Post>().Local.SingleOrDefault(e => e.Id == post.Id);
            if (existingEntity != null)
            {
                _context.Entry(existingEntity).State = EntityState.Detached;
            }

            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeletePost(Post post) 
        {            
            var existingEntity = _context.Set<Post>().Local.SingleOrDefault(e => e.Id == post.Id);
            if (existingEntity != null)
            {
                _context.Entry(existingEntity).State = EntityState.Detached;
            }

            _context.Posts.Remove(existingEntity);
            _context.SaveChanges();
        }

        // Helping Methods
        public Friend? GetFriendByTwoUserId(int id1, int id2)
        {
            return _context.Friends.FirstOrDefault(f => (f.UserId == id1 && f.User_FriendId == id2) || (f.UserId == id2 && f.User_FriendId == id1));
        }

        // --- Post Like
        public PostLike GetPostLikeById(int postLikeId) 
        {
            return _context.PostLikes.FirstOrDefault(pL => pL.Id == postLikeId);
        }

        public void CreatePostLike(PostLike postLike)
        {
            postLike.FriendId = _friendRepository.GetFriendById(postLike.FriendId).Id;
            _context.PostLikes.Add(postLike);
            _context.SaveChanges();
        }

        public void RemovePostLike(PostLike postLike) 
        {
            _context.PostLikes.Remove(postLike);
            _context.SaveChanges();
        }

        // --- Post Comment
        public PostComment GetPostCommmentById(int postCommentId) 
        {
            return _context.PostComments.FirstOrDefault(pC => pC.Id == postCommentId);
        }

        public void CreatePostComment(PostComment postComment)
        {
            _context.PostComments.Add(postComment);
            _context.SaveChanges();
        }

        public void UpdatePostComment(PostComment postComment) 
        {
            _context.Entry(postComment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void RemovePostComment(PostComment postComment)
        {
            _context.PostComments.Remove(postComment);
            _context.SaveChanges();
        }

        //Get all comments post by Post Id
        public List<PostComment> GetAllPostCommentsByPostId(int postId)
        {
            return _context.PostComments.Where(p => p.PostId == postId).ToList();
        }

        //Get all comments post by Post Id
        public List<PostLike> GetAllPostLikesByPostId(int postId)
        {
            return _context.PostLikes.Where(p => p.PostId == postId).ToList();
        }

        //Get all post by user id
        private List<Post> GetAllPostsByUserId(int userId)
        {
            return new List<Post>();
        }

        //Get friend id of user
        private List<int> GetFriendIds(int userId)
        {
            return new List<int>();
        }

        //Get all post by user and friend Id
        public List<Post> GetAllPostByUserAndFriends(int userId)
        {
            List<Post> posts = new List<Post>();

            //Get post of user
            posts.AddRange(GetAllPostsByUserId(userId));

            //Get post of the user's friend
            var friendIds = GetFriendIds(userId);
            foreach (var friendId in friendIds)
            {
                posts.AddRange(GetAllPostsByUserId(friendId));
            }

            return _context.Posts.ToList();
        }
    }
}
