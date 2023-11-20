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

        public UserController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public ActionResult<List<User>> GetAllUser() 
        {
            return Ok(_userRepository.GetAllUsers());
        }

        [HttpGet("{id}")]
        public ActionResult<List<User>> GetUserById()
        {
            return Ok(_userRepository.GetAllUsers());
        }

        [HttpPut("{id}")]
        public ActionResult<User> EditUser(int id, User user)
        {
            var retreivedUser = _userRepository.GetUserById(id);
            bool emailHasEdited = false;

            if (retreivedUser == null)
                return NotFound(new { result = "user_not_found" });

            if(retreivedUser.Email != user.Email)
                emailHasEdited = true;

            retreivedUser = user;

            if(!_userRepository.UpdateUser(user, emailHasEdited))
                return BadRequest(new { result = "not_legitimate_email" });

            return Ok(new { result = "user_details_updated.", user });
        }       
    }
}
