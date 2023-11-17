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


    }
}
