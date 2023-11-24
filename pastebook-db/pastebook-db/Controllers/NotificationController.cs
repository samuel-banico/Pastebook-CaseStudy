using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/notif")]
    public class NotificationController : Controller
    {
        private readonly NotificationRepository _repo;
        private readonly UserRepository _userRepository;

        public NotificationController(NotificationRepository repo, UserRepository userRepository)
        {
            _repo = repo;
            _userRepository = userRepository;
        }

        [HttpGet("unseenNotification")]
        public ActionResult<Notification> GetUnseenNotification(Guid userId) 
        {
            var notifs = _repo.GetUnseenNotifications(userId);

            if (notifs == null)
                return NotFound(new { result = "no_notification" });

            return Ok(notifs);
        }

        [HttpGet("allNotification")]
        public ActionResult<Notification> GetAllNotifications(Guid userId)
        {
            var notifs = _repo.GetAllNotifications(userId);

            if (notifs == null)
                return NotFound(new { result = "no_notification" });

            return Ok(notifs);
        }

        [HttpPut]
        public ActionResult<Notification> SeenNotification(Guid notifId)
        {
            _repo.SeenNotification(notifId);

            return Ok(new { result = "notification_seen"});
        }

        [HttpPut("clearNotification")]
        public ActionResult<Notification> ClearNotification()
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            _repo.ClearNotification(user.Id);

            return Ok(new { result = "notification_seen" });
        }

    }
}
