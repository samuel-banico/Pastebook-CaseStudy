namespace pastebook_db.Models
{
    public class FriendRequest
    {
        public Guid Id { get; set; }
        public DateTime CreatedOn { get; set; }

        //Foreign Key
        public Guid? UserId { get; set; }
        public virtual User? User { get; set; } = null!;
        public Guid? User_FriendId { get; set; }
        public virtual User? User_Friend { get; set; } = null!;
    }
}
