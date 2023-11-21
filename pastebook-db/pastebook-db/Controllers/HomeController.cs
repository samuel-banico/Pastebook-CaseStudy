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

        public HomeController(HomeRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("searchUser")]
        public ActionResult<IEnumerable<UserDTO>> SearchUserByString(string user)
        {
            var users = _repo.GetSearchedUser(user);

            if(users == null || users.Count == 0)
            {
                return NotFound(new { result = "no_match"});
            }

            var userList = new List<UserDTO>();

            foreach (var item in users)
            {
                var u = new UserDTO()
                {
                    Id = item.Id,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    Email = item.Email,
                    Password = item.Password,
                    MobileNumber = item.MobileNumber,
                    Gender = (int)item.Gender,
                    Birthday = item.Birthday.ToString()
                };

                userList.Add(u);
            }

            return Ok(userList);
        }
    }
}