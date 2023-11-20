using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;
using pastebook_db.Services.PasswordHash;

namespace pastebook_db.Controllers
{
    [Route("api/access")]
    [ApiController]
    public class AccessController : ControllerBase
    {
        private readonly AccessRepository _accessRepository;
        private readonly UserRepository _userRepository;

        private readonly IPasswordHash _hashPassword;

        public AccessController(IPasswordHash hashPassword)
        {
            _hashPassword = hashPassword;
        }

        [HttpPost("login")]
        public ActionResult<UserLoginResponse> Login(UserLoginDTO userLogin)
        {
            try
            {
                var user = _userRepository.GetUserByEmail(userLogin.Email);

                if (user == null)
                    return Unauthorized(new { result = "incorrect_credentials" });

                if (!_hashPassword.VerifyPassword(userLogin.Password, user.Password))
                    return Unauthorized(new { result = "incorrect_credentials" });

                var userLoginResponse = new UserLoginResponse
                {
                    email = user.Email,
                    isActive = user.IsActive
                };

                return Ok(userLoginResponse);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error retrieving log in credentials: " + ex.Message);
                return StatusCode(500, "An error occurred while retrieving log in credentials.");
            }
        }

        [HttpPost("register")]
        public ActionResult<User> Register(UserDTO userRegister)
        {
            var existingUser = _userRepository.GetUserByEmail(userRegister.Email);
            if (existingUser != null)
                return BadRequest(new { result = "user_already_exist" });

            var newUser = new User
            {
                FirstName = userRegister.FirstName,
                LastName = userRegister.LastName,
                Email = userRegister.Email,
                Password = _hashPassword.HashPassword(userRegister.Password),
                Birthday = DateTime.Parse(userRegister.Birthday),
                Gender = (Gender)userRegister.Gender,
                MobileNumber = userRegister.MobileNumber,
                ProfilePicture = _userRepository.DefaultImageToByteArray("wwwroot/images/default_pic.png")
            };

            if (!_accessRepository.RegisterUser(newUser))
                return BadRequest(new { result = "not_legitimate_email" });

            return Ok(new { result = "registered" });
        }
    }
}
