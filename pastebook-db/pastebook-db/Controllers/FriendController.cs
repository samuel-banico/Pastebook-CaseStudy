using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/friend")]
    public class FriendController : Controller
    {
        private readonly FriendRepository _friendRepository;
        private readonly NotificationRepository _notificationRepository;

        public FriendController(FriendRepository repo, NotificationRepository notificationRepository)
        {
            _friendRepository = repo;
            _notificationRepository = notificationRepository;
        }

        [HttpGet]
        public ActionResult<Friend> GetFriendById(int userId) 
        {
            var friend = _friendRepository.GetFriendById(userId);

            if(friend == null)
                return NotFound(new { result = "not_friend"});

            return Ok( new { result = "friend", friend });
        }

        [HttpGet("allFriends")]
        public ActionResult<Friend> GetAllFriends(int userId)
        {
            var friend = _friendRepository.GetAllFriends(userId);
            if(friend == null)
                return NotFound(new { result = "no_friends" });

            return Ok(new { result = "friends", friend });

        }

        [HttpGet("allRequest")]
        public ActionResult<FriendRequest> GetAllFriendRequestsByUserId(int userId)
        {
            var request = _friendRepository.GetAllFriendRequest(userId);
            if (request.Count == 0)
                return NotFound(new { result = "no_requests" });

            return Ok(new { result = "requests", request });
        }

        [HttpPost("request")]
        public ActionResult<FriendRequest> FriendRequest(int userId, int friendId) 
        {
            var friendRequest = new FriendRequest();
            friendRequest.UserId = userId;
            friendRequest.User_FriendId = friendId;
            friendRequest.CreatedOn = DateTime.Now;

            _friendRepository.RequestFriend(friendRequest);

            _notificationRepository.CreateNotifFriendRequest(friendRequest);

            return Ok(new { result = "request_sent", friendRequest});
        }

        [HttpPost("accepted")]
        public ActionResult<Friend> AddFriend(int friendRequestId)
        {
            var request = _friendRepository.GetFriendRequest(friendRequestId);
            var addFriend = new Friend();
            addFriend.UserId = request.UserId;
            addFriend.User_FriendId = request.User_FriendId;
            addFriend.IsBlocked = false;
            addFriend.CreatedOn = DateTime.Now;

            _friendRepository.AddedFriend(addFriend, request);

            _notificationRepository.CreateNotifAcceptedFriendRequest(addFriend);

            return Ok(new { result = "request_accepted", request});
        }

        [HttpGet("blocked")]
        public ActionResult<Friend> GetBlockedFriends(int userId)
        {
            var blockedUsers = _friendRepository.GetAllBlockedFriends(userId);

            if (blockedUsers.Count == 0)
                return NotFound(new { result = "no_blocked" });

            return Ok(new { result = "blocked_users", blockedUsers });
        }

        [HttpPut]
        public ActionResult<Friend> BlockFriend(int friendId)
        {
            var userToBlock = _friendRepository.GetFriendById(friendId);

            if (userToBlock == null)
                return NotFound(new { result = "not_friend" });

            userToBlock.IsBlocked = true;

            _friendRepository.UpdateFriend(userToBlock);

            return Ok(new { result = "blocked_user"});
        }
        
        [HttpDelete]
        public ActionResult<Friend> RemoveFriend(int friendId, int userId)
        {
            var userToDelete = _friendRepository.GetFriendByTwoId(userId, friendId);

            if (userToDelete == null)
                return NotFound(new { result = "not_friend" });

            _friendRepository.DeleteFriend(userToDelete);

            return Ok(new { result = "deleted_friend" });
        }
    }
}
