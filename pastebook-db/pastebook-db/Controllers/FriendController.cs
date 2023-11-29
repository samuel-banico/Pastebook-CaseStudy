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
        private readonly FriendRequestRepository _friendRequestRepository;
        private readonly NotificationRepository _notificationRepository;
        private readonly UserRepository _userRepository;

        public FriendController(FriendRepository repo, NotificationRepository notificationRepository, FriendRequestRepository friendRequestRepository, UserRepository userRepository)
        {
            _friendRepository = repo;
            _notificationRepository = notificationRepository;
            _friendRequestRepository = friendRequestRepository;
            _userRepository = userRepository;
        }

        [HttpGet("friend")]
        public ActionResult<Friend> GetFriendship(Guid userId, Guid friendId) 
        {
            var friendship = _friendRepository.GetFriendship(userId, friendId);

            if (friendship == null)
                return NotFound(new { result = "not_friends" });

            return Ok(friendship);
        }

        // returns a list of friends table
        [HttpGet("friendList")]
        public ActionResult<List<Friend>> GetAllFriends(Guid userId)
        {
            var friend = _friendRepository.GetAllFriends(userId);

            if (friend == null)
                return NotFound(new { result = "no_friends" });

            return Ok(friend);

        }

        // returns a list of user table
        [HttpGet("userFriendList")]
        public ActionResult<List<UserSendDTO>> GetAllUserFriends()
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);
            var userFriend = _friendRepository.GetAllUserFriends(user.Id);

            if(userFriend == null)
                return NotFound(new { result = "no_friends" });

            List<UserSendDTO> friendList = new();
            foreach (var friend in userFriend) 
            {
                friendList.Add(_friendRepository.ConvertUserToUserSendDTO(friend));
            }

            return Ok(userFriend);
        }

        [HttpGet("blocked")]
        public ActionResult<Friend> GetBlockedFriends(Guid userId)
        {
            var blockedUsers = _friendRepository.GetAllBlockedFriends(userId);

            if (blockedUsers.Count == 0)
                return NotFound(new { result = "no_blocked" });

            return Ok(new { result = "blocked_users", blockedUsers });
        }

        [HttpPost("accepted")]
        public ActionResult<Friend> AddFriend(Guid friendRequestId)
        {
            var request = _friendRequestRepository.GetFriendRequest(friendRequestId);
            var addFriend = new Friend();
            addFriend.UserId = request.UserId;
            addFriend.User_FriendId = request.User_FriendId;
            addFriend.IsBlocked = false;
            addFriend.CreatedOn = DateTime.Now;

            _friendRequestRepository.AddedFriend(addFriend, request);

            _notificationRepository.CreateNotifAcceptedFriendRequest(addFriend.UserId, addFriend.User_FriendId);

            return Ok(new { result = "request_accepted", request});
        }

        [HttpPut]
        public ActionResult<Friend> BlockFriend(Guid friendId, Guid userId)
        {
            var userToBlock = _friendRepository.GetFriendship(userId, friendId);

            if (userToBlock == null)
                return NotFound(new { result = "not_friend" });

            userToBlock.IsBlocked = true;

            _friendRepository.UpdateFriend(userToBlock);

            return Ok(new { result = "blocked_user"});
        }
        
        // editing
        [HttpDelete]
        public ActionResult<Friend> RemoveFriend(Guid friendId, Guid userId)
        {
            var userToDelete = _friendRepository.GetFriendship(userId, friendId);

            if (userToDelete == null)
                return NotFound(new { result = "not_friend" });

            _friendRepository.DeleteFriend(userToDelete);

            return Ok(new { result = "deleted_friend" });
        }
    }
}
