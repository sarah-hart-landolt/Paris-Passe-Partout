using Microsoft.AspNetCore.Mvc;
using System;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using ParisPassePartout.Repositories;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;

namespace ParisPassePartout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly UserProfileRepository _userProfileRepository;

        public UserProfileController(ApplicationDbContext context, IConfiguration configuration)
        {
            _userProfileRepository = new UserProfileRepository(context, configuration);
        }
          

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("id/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepository.GetUserProfileById(id));
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.IsActivated = true;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, UserProfile userProfile)
        {
            var currentUser = GetCurrentUserProfile();

            userProfile.FirebaseUserId = currentUser.FirebaseUserId;
            userProfile.CreateDateTime = currentUser.CreateDateTime;
            userProfile.Email = currentUser.Email;
            userProfile.IsActivated = true;
            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            _userProfileRepository.Update(userProfile);
            return Ok(userProfile);
        }

        [HttpGet("search")]

        public IActionResult Search(string searchString)
        {
            if (String.IsNullOrEmpty(searchString))
            {
                return Ok(_userProfileRepository.GetAll());
            }
            else
            {
                return Ok(_userProfileRepository.Search(searchString));

            }
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}