using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using ParisPassePartout.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ParisPassePartout.Controllers
{
    public class PinCollectionController : ControllerBase
    {
        private readonly PinCollectionRepository _pcRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public PinCollectionController(ApplicationDbContext context, IConfiguration configuration)
        {
            _pcRepository = new PinCollectionRepository(context);
            _userProfileRepository = new UserProfileRepository(context, configuration);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_pcRepository.GetAll());
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tag = _pcRepository.GetById(id);
            if (tag != null)
            {
                NotFound();
            }
            return Ok(tag);
        }

        [HttpPost]
        public IActionResult Post(PinCollection pc)
        {
            pc.CreateDateTime = DateTime.Now;
            var currentUser = GetCurrentUserProfile();
            pc.UserProfileId = currentUser.Id;

            _pcRepository.Add(pc);
            return CreatedAtAction(nameof(Get), new { id = pc.Id }, pc);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, PinCollection pc)
        {
            if (id != pc.Id)
            {
                return BadRequest();
            }

            _pcRepository.Update(pc);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _pcRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
