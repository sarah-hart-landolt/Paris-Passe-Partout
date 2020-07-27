using Microsoft.AspNetCore.Mvc;
using System;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using ParisPassePartout.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly UserProfileRepository _userProfileRepository;
        public UserProfileController(ApplicationDbContext context)
        {
            _userProfileRepository = new UserProfileRepository(context);
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
        public IActionResult Edit(UserProfile userProfile)
        {
            _userProfileRepository.Update(userProfile);
            return Ok(userProfile);
        }
    }
}