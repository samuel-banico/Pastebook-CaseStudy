namespace pastebook_db.Models
{
    public class Album
    {
        public int Id { get; set; }
        public string AlbumName { get; set; } = null!;
        public string AlbumDescription { get; set; } = null!;
        public bool IsPublic { get; set; }

        // Foreign Key
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
    }

    public class AlbumDTO
    {
        public string AlbumName { get; set; } = null!;
        public string AlbumDescription { get; set; } = null!;
        public bool IsPublic { get; set; }

        public List<IFormFile>? Images { get; set; }
    }
}
