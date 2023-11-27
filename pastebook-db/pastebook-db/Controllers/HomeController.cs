using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;
using System.Diagnostics;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/home")]
    public class HomeController : Controller
    {
        private readonly HomeRepository _repo;
        private readonly UserRepository _userRepository;

        public HomeController(HomeRepository repo, UserRepository userRepository)
        {
            _repo = repo;
            _userRepository = userRepository;
        }

        // Search Modal
        [HttpGet("searchUser")]
        public ActionResult<IEnumerable<UserSendDTO>?> SearchUserByString(string user)
        {
            var token = Request.Headers["Authorization"];
            var loggedUser = _userRepository.GetUserByToken(token);
            var users = _repo.GetSearchedUser(user, loggedUser.Id).Take(5);

            var userList = new List<UserSendDTO>();

            foreach (var item in users)
            {
                var u = new UserSendDTO()
                {
                    Id = item.Id,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    ProfilePicture = _userRepository.SendImageToAngular(item.ProfilePicture)
                };

                userList.Add(u);
            }

            return Ok(userList);
        }
        
        // Search Page
        [HttpGet("searchAllUsers")]
        public ActionResult<IEnumerable<UserSendDTO>?> SearchAllUsersByString(string user)
        {
            var token = Request.Headers["Authorization"];
            var loggedUser = _userRepository.GetUserByToken(token);
            var users = _repo.GetSearchedUser(user, loggedUser.Id);

            var userList = new List<UserSendDTO>();

            foreach (var item in users)
            {
                var u = new UserSendDTO()
                {
                    Id = item.Id,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    ProfilePicture = item.ProfilePicture
                };

                userList.Add(u);
            }

            return Ok(userList);
        }
    }
}