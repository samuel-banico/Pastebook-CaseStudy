namespace pastebook_db.Models
{
    public class Album
    {
        public int Id { get; set; }
        public string AlbumName { get; set; } = null!;
        public string AlbumDescription { get; set; } = null!;
        public bool IsPublic { get; set; }
        public bool IsEdited { get; set; }
        public DateTime CreatedOn { get; set; }
        public byte[]? CoverAlbumImage { get; set; }

        // Foreign Key
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;

        public ICollection<AlbumImage>? AlbumImageList { get; set; }
    }

    public class AlbumDTO
    {
        public int? Id { get; set; }
        public string AlbumName { get; set; } = null!;
        public string AlbumDescription { get; set; } = null!;
        public bool IsPublic { get; set; }
        public bool IsEdited { get; set; }
        public string? CreatedOn { get; set; }
        public byte[]? CoverAlbumImage { get; set; }

        public int UserId { get; set; }

        public ICollection<AlbumImage>? AlbumImageList { get; set; }
    }
}
