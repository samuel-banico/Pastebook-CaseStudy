using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using NuGet.Packaging;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class PostRepository
    {
        private readonly PastebookContext _context;
        private readonly UserRepository _userRepository;
        private readonly FriendRepository _friendRepository;

        public PostRepository(PastebookContext context, FriendRepository friendRepository, UserRepository userRepository)
        {
            _context = context;
            _friendRepository = friendRepository;
            _userRepository = userRepository;
        }

        public Post? GetPostById(Guid id)
        {
            var post = _context.Posts
                            .Include(p => p.PostLikeList)
                            .Include(p => p.PostCommentList)
                            .FirstOrDefault(p => p.Id == id);
            return post;
        }

        public List<Post> GetAllPostOfUserTimeline(Guid userId)
        {
            return _context.Posts
                        .Include(pL => pL.PostLikeList)
                        .Include(pL => pL.PostCommentList)
                        .Where(p => p.UserId == userId)
                        .ToList();
        }

        public List<Post> GetAllPostOfOtherTimeline(Guid retrievedUserId, Guid loggedUserId)
        {
            var isFriend = _friendRepository.GetFriendship(retrievedUserId, loggedUserId);

            if (isFriend != null)
                return GetAllPostOfUserTimeline(retrievedUserId);

            return _context.Posts.Where(p => p.UserId == retrievedUserId && p.IsPublic == true).ToList();
        }

        //Get all post friend Id
        public List<Post>? GetAllPostOfFriends(Guid userId)
        {
            var friendList = _friendRepository.GetAllUserFriends(userId);

            if (friendList == null)
                return null;

            List<Post> posts = new();

            foreach (var friend in friendList)
            {
                posts.AddRange(GetAllPostOfUserTimeline(friend.Id));
            }

            return posts;
        }

        // --- POST
        public void CreatePost(Post post)
        {

            _context.Posts.Add(post);
            _context.SaveChanges();
        }
        
        // --- PUT
        public void UpdatePost(Post post) 
        {
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

        // --- DELETE
        public void DeletePost(Post post) 
        {            
            _context.Posts.Remove(post);
            _context.SaveChanges();
        }

        // HELPER METHOD
        public PostDTO ConvertPostToPostDTO(Post post) 
        {
            
            var likeCount = 0;

            var commentCount = 0;

            if (post.PostLikeList != null)
                likeCount = post.PostLikeList.Count();
            if (post.PostCommentList != null)
                commentCount = post.PostCommentList.Count();

            var user = _userRepository.GetUserById(post.UserId);

            var postDto = new PostDTO()
            {
                Id = post.Id,
                Content = post.Content,
                IsPublic = post.IsPublic,
                IsEdited = post.IsEdited,
                FullName = $"{user.FirstName} {user.LastName}",
                LikeCount = likeCount,
                CommentCount = commentCount,

                UserId = post.UserId,
                FriendId = post.FriendId,

                PostLikeList = post.PostLikeList,
                PostCommentList = post.PostCommentList
            };

            return postDto;
        }
    }
}
