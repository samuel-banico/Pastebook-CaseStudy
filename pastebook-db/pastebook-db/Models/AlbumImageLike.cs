namespace pastebook_db.Models
{
    public class AlbumImageLike
    {
        public int Id { get; set; }

        // Foreign Key
        public int AlbumImageId { get; set; }
        public virtual AlbumImage AlbumImage { get; set; } = null!;

        public int FriendId { get; set; }
        public virtual Friend Friend { get; set; } = null!;
    }
}
