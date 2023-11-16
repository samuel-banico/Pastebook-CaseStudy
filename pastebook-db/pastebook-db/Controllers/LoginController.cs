using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class LoginController : ControllerBase
    {
        private readonly UserRepository _userRepository;

        public LoginController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("register")]  
        public ActionResult<User> Register(UserRegister userRegister)
        {
            // Checks if email is already used.
            var existingUser = _userRepository.GetUserByEmail(userRegister.Email);
            if (existingUser != null)
            {
                return BadRequest(new { result = "user_already_exist" });
            }
                       
            var newUser = new User
            {
                FirstName = userRegister.FirstName,
                LastName = userRegister.LastName,
                Email = userRegister.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(userRegister.Password),
                Birthday = userRegister.Birthday,
                Gender = userRegister.Gender,
                MobileNumber = userRegister.MobileNumber,
            };

            _userRepository.RegisterUser(newUser);

            return Ok(new { result = "registered" });
        }

        /*public IActionResult Login() 
        {
            return View();
        }*/
    }
}
