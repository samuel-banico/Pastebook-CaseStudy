namespace pastebook_db.Models
{
    public class AlbumImageComment
    {
        public int Id { get; set; }
        public string Comment { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public bool IsEdited { get; set; }

        // Foreign Key
        public int AlbumImageId { get; set; }
        public virtual AlbumImage AlbumImage { get; set; } = null!;

        public int FriendId { get; set; }
        public virtual Friend Friend { get; set; } = null!;
    }
}
