using Lab8.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace Lab8.Controllers
{
    [ApiController]
    [Route("/api/Lera")]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;

        public UserController(ILogger<UserController> logger, UserRepository genericRepository)
        {
            _userRepository = genericRepository;
        }

        /// <summary>
        /// Get All Users
        /// </summary>
        /// <remarks>
        /// create 20.05.2022
        /// </remarks>
        [ProducesResponseType(typeof(Users), 200)]
        [HttpGet]
        public Users Get()
        {
            return new Users
            {
                UserList = _userRepository.GetAll().ToList()
            };
        }

        /// <summary>
        /// Add User
        /// </summary>
        /// <remarks>
        /// create 20.05.2022
        /// </remarks>
        /// <response code="200">User updated</response>
        /// <response code="404">User not added</response>
        [HttpPost]
        [ProducesResponseType(typeof(User), 200)]
        public User AddUser(User user)
        {
            try
            {
                _userRepository.Add(user);
                _userRepository.SaveChanges();
                return user;
            }
            catch
            {
                Response.StatusCode = 404;
            }

            return user;
        }

        /// <summary>
        /// Get User by Id
        /// </summary>
        /// <remarks>
        /// create 20.05.2022
        /// </remarks>
        /// <param name="id" example="101">The User id</param>
        /// <response code="200">User found</response>
        /// <response code="404">User not found</response>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(User), 200)]
        public ActionResult<User> GetUser(int id)
        {
            var user = _userRepository.GetById(id);

            return user is not null ? Ok(user) : NotFound();
        }

        /// <summary>
        /// Update User
        /// </summary>
        /// <remarks>
        /// create 20.05.2022
        /// </remarks>
        /// <response code="200">User found</response>
        /// <response code="404">User not found</response>
        [HttpPut]
        [ProducesResponseType(typeof(User), 200)]
        public ActionResult EditUser(User user)
        {
            return _userRepository.Update(user) ? Ok(user) : NotFound();
        }


        /// <summary>
        /// Delete User by Id
        /// </summary>
        /// <remarks>
        /// create 20.05.2022
        /// </remarks>
        /// <param name="id" example="101">The User id</param>
        /// <response code="200">User found</response>
        /// <response code="404">User not found</response>
        [HttpDelete("{id:int}")]
        [ProducesResponseType(typeof(User), 200)]
        public ActionResult DeleteUser(int id)
        {
           return  _userRepository.Remove(id) ? Ok():NotFound();
        }
    }
}