namespace pastebook_db.Models
{
    public class FriendRequest
    {
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }

        //Foreign Key
        public int? UserId { get; set; }
        public virtual User? User { get; set; } = null!;
        public int? User_FriendId { get; set; }
        public virtual User? User_Friend { get; set; } = null!;
    }
}
