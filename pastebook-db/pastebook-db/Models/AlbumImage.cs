namespace pastebook_db.Models
{
    public class AlbumImage
    {
        public int Id { get; set; }
        public byte[] Image { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public bool IsEdited { get; set; }

        // Foreign Key
        public int? AlbumId { get; set; }
        public virtual Album? Album { get; set; } = null!;

        public ICollection<AlbumImageLike>? AlbumImageLikesList { get; set; }
        public ICollection<AlbumImageComment>? AlbumImageCommentsList { get; set; }
    }

    public class AlbumImageDTO
    {
        public int? Id { get; set; }
        public byte[]? Image { get; set; } = null!;
        public string? CreatedOn { get; set; }
        public bool? IsEdited { get; set; }

        public int? LikeCount { get; set; }
        public int? CommentCount { get; set; }

        public int? AlbumId { get; set; }

        public ICollection<AlbumImageLike>? AlbumImageLikesList { get; set; }
        public ICollection<AlbumImageComment>? AlbumImageCommentsList { get; set; }
    }
}
