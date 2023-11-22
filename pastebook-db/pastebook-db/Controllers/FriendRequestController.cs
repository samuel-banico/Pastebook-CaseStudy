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

        public FriendRequestController(FriendRequestRepository friendRepository, NotificationRepository notificationRepository)
        {
            _friendRequestRepository = friendRepository;
            _notificationRepository = notificationRepository;
        }

        [HttpGet("allRequest")]
        public ActionResult<FriendRequest> GetAllFriendRequestsByUserId(Guid userId)
        {
            var request = _friendRequestRepository.GetAllFriendRequest(userId);
            if (request.Count == 0)
                return NotFound(new { result = "no_requests" });

            return Ok(new { result = "requests", request });
        }

        [HttpPost("request")]
        public ActionResult<FriendRequest> FriendRequest(Guid userId, Guid friendId)
        {
            var friendRequest = new FriendRequest();
            friendRequest.UserId = userId;
            friendRequest.User_FriendId = friendId;
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
