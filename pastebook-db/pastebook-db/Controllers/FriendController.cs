using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/friend")]
    public class FriendController : Controller
    {
        private readonly FriendRepository _repo;
        private readonly PastebookContext _context;

        public FriendController(FriendRepository repo, PastebookContext context)
        {
            _repo = repo;
            _context = context;
        }

        [HttpPost("request")]
        public IActionResult FriendRequest(int userId, int friendId) 
        {
            var friendRequest = new FriendRequest();
            friendRequest.UserId = userId;
            friendRequest.User_FriendId = friendId;
            friendRequest.CreatedOn = DateTime.Now;

            _repo.RequestFriend(friendRequest);

            return Ok();
        }

        [HttpPost("accepted")]
        public IActionResult AddFriend(int userId, int friendId)
        {
            var addFriend = new Friend();
            addFriend.UserId = userId;
            addFriend.User_FriendId = friendId;
            addFriend.IsBlocked = false;
            addFriend.CreatedOn = DateTime.Now;

            _repo.Friend(addFriend);
            
            return Ok();
        }
    }
}
