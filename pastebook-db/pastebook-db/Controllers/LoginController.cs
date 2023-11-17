﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("getAllUser")]
        public ActionResult<List<User>> GetAllUser() 
        {
            return Ok(_userRepository.GetAllUsers());
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
                MobileNumber = userRegister.MobileNumber
            };

            _userRepository.RegisterUser(newUser);

            return Ok(new { result = "registered" });
        }

        [HttpPost("login")]
        public ActionResult<UserLoginResponse> Login(UserLogin userLogin)
        {
            try
            {
                var user = _userRepository.GetUserByEmail(userLogin.Email);

                if (user == null)
                {
                    return NotFound(new { result = "user_not_found" });
                }

                if (user.Password != userLogin.Password)
                {
                    return BadRequest(new { result = "incorrect_credentials" });
                }

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

        [HttpPut("{id}")]
        public ActionResult<User> EditFirstName(int id, User user)
        {
            var retreivedUser = _userRepository.GetUserById(id);
            if (retreivedUser == null)
                return NotFound(new { result = "user_not_found" });

            retreivedUser = user;

            _userRepository.UpdateUser(user);

            return Ok(new { result = "FirstName_has_been_updated.", user });
        }
    }
}
