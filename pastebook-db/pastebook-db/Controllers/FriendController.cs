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

        public FriendController(FriendRepository repo)
        {
            _repo = repo;
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
        public IActionResult AddFriend(int friendRequestId)
        {
            var request = _repo.GetFriendRequest(friendRequestId);
            var addFriend = new Friend();
            addFriend.UserId = request.UserId;
            addFriend.User_FriendId = request.User_FriendId;
            addFriend.IsBlocked = false;
            addFriend.CreatedOn = DateTime.Now;

            _repo.AddedFriend(addFriend, request);

            return Ok();
        }

    }
}
