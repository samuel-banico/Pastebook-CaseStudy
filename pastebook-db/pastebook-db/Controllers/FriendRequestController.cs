using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [Route("api/friendRequest")]
    [ApiController]
    public class FriendRequestController : ControllerBase
    {
        private readonly FriendRequestRepository _friendRequestRepository;
        private readonly NotificationRepository _notificationRepository;
        private readonly UserRepository _userRepository;

        public FriendRequestController(FriendRequestRepository friendRepository, NotificationRepository notificationRepository, UserRepository userRepository)
        {
            _friendRequestRepository = friendRepository;
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
        }

        [HttpGet("allRequest")]
        public ActionResult<FriendRequest> GetAllFriendRequestsByUserId()
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);
            var request = _friendRequestRepository.GetAllFriendRequest(user.Id);
            if (request.Count == 0)
                return NotFound(new { result = "no_requests" });

            return Ok(request);
        }

        [HttpPost("request")]
        public ActionResult<FriendRequest> FriendRequest(User friend)
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            var friendRequest = new FriendRequest();
            friendRequest.UserId = user.Id;
            friendRequest.User_FriendId = friend.Id;
            friendRequest.CreatedOn = DateTime.Now;
            _friendRequestRepository.RequestFriend(friendRequest);

            _notificationRepository.CreateNotifFriendRequest(friendRequest);

            return Ok(new { result = "request_sent", friendRequest });
        }

        [HttpDelete("rejectRequest")]
        public ActionResult<FriendRequest> RejectFriendReq(Guid friendReq)
        {
            _friendRequestRepository.DeleteFriendRequest(friendReq);
            return Ok(new { result = "friend_request_rejected" });
        }
    }
}
