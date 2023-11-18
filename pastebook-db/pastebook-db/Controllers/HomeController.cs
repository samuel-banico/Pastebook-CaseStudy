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
        public IActionResult SearchUserByString(string user)
        {
            var users = _repo.getAllUser().Where(u => u.FirstName.ToLower().Contains(user.ToLower()) || u.LastName.ToLower().Contains(user.ToLower())).Take(5).ToList();
            return Ok(users);
        }
    }
}