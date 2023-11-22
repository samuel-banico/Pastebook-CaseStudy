using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;
using pastebook_db.Services.PasswordHash;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        private readonly IPasswordHash _passwordHasher;

        public UserController(UserRepository userRepository, IPasswordHash passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
        }

        [HttpGet]
        public ActionResult<List<UserSendDTO>> GetAllUser() 
        {
            var userList = _userRepository.GetAllUsers();

            if(userList == null || userList.Count == 0)
                return BadRequest(new { result = "user_not_found" });

            var userSendDTOList = new List<UserSendDTO>();
            foreach (var user in userList) 
            {
                var userDTO = _userRepository.ConvertUserToUserSendDTO(user);
                userSendDTOList.Add(userDTO);
            }

            return Ok(userSendDTOList);
        }

        [HttpGet("{id}")]
        public ActionResult<List<UserSendDTO>> GetUserById(Guid id)
        {
            var user = _userRepository.GetUserById(id);

            if (user == null)
                return BadRequest(new { result = "user_not_found" });

            var userDTO = _userRepository.ConvertUserToUserSendDTO(user);

            return Ok(userDTO);
        }

        [HttpGet("getPassword")]
        public ActionResult<bool> GetUserPasswordById([FromQuery] Guid id, [FromQuery] string password)
        {
            var user = _userRepository.GetUserById(id);

            if (user == null)
                return BadRequest(new { result = "user_not_found" });

            if (!_passwordHasher.VerifyPassword(password, user.Password))
                return Unauthorized(new { result = "password_incorrect" });

            return Ok(true);
        }

        [HttpPut("editUserGeneral")]
        public ActionResult<User> EditUserGeneral(Guid id, [FromBody] EditUserReceiveGeneralDTO user)
        {
            var retreivedUser = _userRepository.GetUserById(id);
            if (retreivedUser == null)
                return BadRequest(new { result = "user_not_found" });

            retreivedUser.FirstName = user.FirstName;
            retreivedUser.LastName = user.LastName;
            retreivedUser.Birthday = DateTime.Parse(user.Birthday);
            retreivedUser.Gender = (Gender)user.Gender;

            if (!_userRepository.UpdateUser(retreivedUser, false))
                return BadRequest(new { result = "not_legitimate_email" });

            return Ok(new { result = "user_details_updated.", user });
        }

        [HttpPut("editUserSecurity")]
        public ActionResult<User> EditUserSecurity(Guid id, [FromBody] EditUserReceiveSecurityDTO user)
        {
            var retreivedUser = _userRepository.GetUserById(id);
            if (retreivedUser == null)
                return BadRequest(new { result = "user_not_found" });

            bool emailHasBeenEdited = false;
            if(!retreivedUser.Email.Equals(user.Email, StringComparison.CurrentCultureIgnoreCase))
                emailHasBeenEdited = true;

            retreivedUser.Email = user.Email;
            retreivedUser.MobileNumber = user.MobileNumber;

            if(user.Password != null && user.Password != "")
                retreivedUser.Password = _passwordHasher.HashPassword(user.Password);

            if (!_userRepository.UpdateUser(retreivedUser, emailHasBeenEdited))
                return BadRequest(new { result = "not_legitimate_email" });

            return Ok(new { result = "user_details_updated.", user });
        }
    }
}
