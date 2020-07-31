using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using ParisPassePartout.Repositories;

namespace ParisPassePartout.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionController : ControllerBase
    {
        private readonly ReactionRepository _reactionRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public ReactionController(ApplicationDbContext context)
        {
            _reactionRepository = new ReactionRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reactionRepository.GetAll());
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var react = _reactionRepository.GetById(id);
            if (react != null)
            {
                NotFound();
            }
            return Ok(react);
        }

        [HttpPost]
        public IActionResult Post(Reaction react)
        {

            _reactionRepository.Add(react);
            return CreatedAtAction(nameof(Get), new { id = react.Id }, react);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Reaction react)
        {
            if (id != react.Id)
            {
                return BadRequest();
            }

            _reactionRepository.Update(react);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _reactionRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
