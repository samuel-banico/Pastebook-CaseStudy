namespace pastebook_db.Models
{
    public class PostComment
    {
        public int Id { get; set; }
        public string Comment { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public bool IsEdited { get; set; }

        public int PostId { get; set; }
        public virtual Post Post { get; set; } = null!;
        public int User_FriendId { get; set; }
        public virtual User User_Friend { get; set; } = null!;



    }
}
