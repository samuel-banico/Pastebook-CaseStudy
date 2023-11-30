﻿using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;
using System.Diagnostics;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/home")]
    public class HomeController : Controller
    {
        private readonly HomeRepository _repo;
        private readonly UserRepository _userRepository;
        private readonly FriendRepository _friendRepository;

        public HomeController(HomeRepository repo, UserRepository userRepository, FriendRepository friendRepository)
        {
            _repo = repo;
            _userRepository = userRepository;
            _friendRepository = friendRepository;
        }

        // Search Modal
        [HttpGet("searchUser")]
        public ActionResult<IEnumerable<UserSendDTO>?> SearchUserByString(string user)
        {
            var token = Request.Headers["Authorization"];
            var loggedUser = _userRepository.GetUserByToken(token);
            var users = _repo.GetSearchedUser(user, loggedUser.Id).Take(5);

            var userList = new List<UserSendDTO>();

            foreach (var u in users)
            {
                userList.Add(_friendRepository.ConvertUserToUserSendDTO(u));
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
                userList.Add(_friendRepository.ConvertUserToUserSendDTO(item));
            }

            return Ok(userList);
        }
    }
}