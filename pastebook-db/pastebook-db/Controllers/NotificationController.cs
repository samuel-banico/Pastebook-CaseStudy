using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public ActionResult<Notification> GetUnseenNotification()
        {
            //Added for Notif Connection
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);
            var notifs = _repo.GetUnseenNotifications(user.Id);

            if (notifs == null)
                return NotFound(new { result = "no_notification" });

            return Ok(notifs);
        }

        [HttpGet("allNotification")]
        public ActionResult<Notification> GetAllNotifications()
        {
            //Added for Notif Connection
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);
            var notifs = _repo.GetAllNotifications(user.Id);

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

    }
}
