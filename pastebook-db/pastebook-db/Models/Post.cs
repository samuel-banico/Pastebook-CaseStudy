using System.ComponentModel.DataAnnotations;

namespace pastebook_db.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Content { get; set; } = null!;
        public bool IsPublic { get; set; }
        public bool IsEdited { get; set; }
        public DateTime CreatedOn { get; set; }
        public int LikeCount { get; set; }
        public int CommentCount { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public int? FriendId { get; set; }
        public virtual Friend? Friend { get; set; }
    }

    public class PostDTO
    {
        [Required]
        public string Content { get; set; } = null!;
        public bool IsPublic { get; set; }
    }
}
