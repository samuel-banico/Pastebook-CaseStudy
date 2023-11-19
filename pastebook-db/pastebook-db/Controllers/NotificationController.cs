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

        public NotificationController(NotificationRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("unseenNotification")]
        public ActionResult<Notification> GetUnseenNotification(int userId) 
        {
            var notifs = _repo.GetUnseenNotifications(userId);

            if (notifs == null)
                return NotFound(new { result = "no_notification" });

            return Ok(notifs);
        }

        [HttpGet("allNotification")]
        public ActionResult<Notification> GetAllNotifications(int userId)
        {
            var notifs = _repo.GetAllNotifications(userId);

            if (notifs == null)
                return NotFound(new { result = "no_notification" });

            return Ok(notifs);
        }

        [HttpPut]
        public ActionResult<Notification> SeenNotification(int notifId)
        {
            _repo.SeenNotification(notifId);

            return Ok(new { result = "notification_seen"});
        }

    }
}
