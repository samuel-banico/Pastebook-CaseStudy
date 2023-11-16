namespace pastebook_db.Models
{
    public class PostComment
    {
        public int Id { get; set; }
        public string Comment { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public bool IsEdited { get; set; }

        //Foreign Key
        public int PostId { get; set; }
        public virtual Post Post { get; set; } = null!;
        public int FriendId { get; set; }
        public virtual Friend Friend { get; set; } = null!;
    }
}
