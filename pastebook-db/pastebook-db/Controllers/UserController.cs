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
        public ActionResult<List<UserSendDTO>> GetUserById(int id)
        {
            var user = _userRepository.GetUserById(id);

            if (user == null)
                return BadRequest(new { result = "user_not_found" });

            var userDTO = _userRepository.ConvertUserToUserSendDTO(user);

            return Ok(userDTO);
        }

        [HttpPut("{id}")]
        public ActionResult<User> EditUser(int id, UserReceiveDTO user)
        {
            var retreivedUser = _userRepository.GetUserById(id);
            if (retreivedUser == null)
                return BadRequest(new { result = "user_not_found" });

            bool emailHasEdited = false;
            if(retreivedUser.Email != user.Email)
                emailHasEdited = true;

            retreivedUser.FirstName = user.FirstName;
            retreivedUser.LastName = user.LastName;
            retreivedUser.Email = user.Email;
            retreivedUser.Password = _passwordHasher.HashPassword(user.Password);
            retreivedUser.Birthday = DateTime.Parse(user.Birthday);
            retreivedUser.Gender = (Gender)user.Gender;
            retreivedUser.UserBio = user.UserBio;
            retreivedUser.MobileNumber = user.MobileNumber;
            retreivedUser.ProfilePicture = _userRepository.ImageToByteArray(user.ProfilePicture);

            if (!_userRepository.UpdateUser(retreivedUser, emailHasEdited))
                return BadRequest(new { result = "not_legitimate_email" });

            return Ok(new { result = "user_details_updated.", user });
        }       
    }
}
