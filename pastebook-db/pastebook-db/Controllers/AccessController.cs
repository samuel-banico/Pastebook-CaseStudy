using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;
using pastebook_db.Services.PasswordHash;
using pastebook_db.Services.Token.TokenData;
using pastebook_db.Services.Token.TokenGenerator;
using System.Security.Claims;

namespace pastebook_db.Controllers
{
    [Route("api/access")]
    [ApiController]
    public class AccessController : ControllerBase
    {
        private readonly AccessRepository _accessRepository;
        private readonly UserRepository _userRepository;

        private readonly IPasswordHash _hashPassword;
        private readonly TokenController _tokenController;

        public AccessController(IPasswordHash hashPassword, AccessRepository accessRepository, UserRepository userRepository, TokenController tokenController)
        {
            _hashPassword = hashPassword;
            _accessRepository = accessRepository;
            _userRepository = userRepository;
            _tokenController = tokenController;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserLoginResponse>> Login(UserLoginDTO userLogin)
        {
            try 
            { 
                if (string.IsNullOrEmpty(userLogin.Email) || string.IsNullOrEmpty( userLogin.Password))
                return BadRequest(new { result = "empty_field" });

                var user = _userRepository.GetUserByEmail(userLogin.Email);

                if (user == null)
                    return Unauthorized(new { result = "incorrect_credentials" });

                if (!_hashPassword.VerifyPassword(userLogin.Password, user.Password))
                    return Unauthorized(new { result = "incorrect_credentials" });

                var createdtoken = await _tokenController.Authenticate(user);

                var userLoginResponse = new UserLoginResponse
                {
                    email = user.Email,
                    id = user.Id,
                    token = createdtoken
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
        public ActionResult<User> Register(UserReceiveDTO userRegister)
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
                ProfilePicture = _userRepository.ImageToByteArray(null),
                UserBio = "Hi, Everyone! I am new to Pastebook."
            };

            if (!_accessRepository.RegisterUser(newUser))
                return BadRequest(new { result = "not_legitimate_email" });

            return Ok(new { result = "registered" });
        }

        [Authorize]
        [HttpDelete("logout")]
        public async Task<IActionResult> Logout()
        {
            string rawUserId = HttpContext.User.FindFirstValue("id");

            if (!Guid.TryParse(rawUserId, out Guid userId))
            {
                return Unauthorized();
            }

            await _tokenController.DeleteAll(userId);
            return NoContent();
        }
    }
}
