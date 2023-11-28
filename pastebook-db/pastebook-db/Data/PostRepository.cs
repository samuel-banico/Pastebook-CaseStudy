using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using NuGet.Packaging;
using pastebook_db.Database;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;

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
                .Include(p => p.PostCommentList)
                .ThenInclude(u => u.User)
                .Include(p => p.PostLikeList)
                .ThenInclude(u => u.User)
                .Include(u => u.User)
                // Friends Credentials
                .Include(f => f.Friend)
                .ThenInclude(u => u.User)
                .Include(f => f.Friend)
                .ThenInclude(f => f.User_Friend)
                .FirstOrDefault(p => p.Id == id);

            return post;
        }

        public List<Post> GetAllPostOfUserTimeline(Guid userId)
        {
            return _context.Posts
                .Include(p => p.PostCommentList)
                .ThenInclude(u => u.User)
                .Include(p => p.PostLikeList)
                .ThenInclude(u => u.User)
                .Include(u => u.User)
                // Friends Credentials
                .Include(f => f.Friend)
                .ThenInclude(u => u.User)
                .Include(f => f.Friend)
                .ThenInclude(f => f.User_Friend)
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedOn)
                .ToList();
        }

        public List<Post> GetAllPostOfOtherTimeline(Guid retrievedUserId, Guid loggedUserId)
        {
            var isFriend = _friendRepository.GetFriendship(retrievedUserId, loggedUserId);

            if (isFriend != null)
                return GetAllPostOfUserTimeline(retrievedUserId);

            return _context.Posts
                // Comments
                .Include(p => p.PostCommentList)
                // Users who commented
                .ThenInclude(u => u.User)
                // Likes
                .Include(p => p.PostLikeList)
                // Users who likes
                .ThenInclude(u => u.User)
                // The posters credentials
                .Include(u => u.User)
                // Friends Credentials
                .Include(f => f.Friend)
                .ThenInclude(u => u.User)
                .Include(f => f.Friend)
                .ThenInclude(f => f.User_Friend)
                .Where(p => p.UserId == retrievedUserId && p.IsPublic == true)
                .OrderByDescending(p => p.CreatedOn)
                .ToList();
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

        public List<Post>? GetAllPublicPosts() 
        {
            try
            {
                return _context.Posts
                .Include(p => p.PostCommentList)
                .ThenInclude(u => u.User)
                .Include(p => p.PostLikeList)
                .ThenInclude(u => u.User)
                .Include(u => u.User)
                // Friends Credentials
                .Include(f => f.Friend)
                .ThenInclude(u => u.User)
                .Include(f => f.Friend)
                .ThenInclude(f => f.User_Friend)
                .Where(p => p.IsPublic == true)
                .OrderByDescending(p => p.CreatedOn)
                .ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
            
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

        // POST DTO
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
                CreatedOn = post.CreatedOn.ToString("yyyy-MM-dd"),

                LikeCount = likeCount,
                CommentCount = commentCount,

                UserId = post.UserId,
                FriendId = post.FriendId,
                Friend = post.Friend,

                PostLikeList = post.PostLikeList,
                PostCommentList = post.PostCommentList
            };

            var UserPostDTO = _friendRepository.ConvertUserToUserSendDTO(post.User);

            postDto.User = UserPostDTO;

            return postDto;
        }
    }
}
