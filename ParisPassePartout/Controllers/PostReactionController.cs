using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using ParisPassePartout.Repositories;

namespace ParisPassePartout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostReactionController : ControllerBase
    {
        private readonly PostReactionRepository _postReactionRepository;

        public PostReactionController(ApplicationDbContext context)
        {
            _postReactionRepository = new PostReactionRepository(context);

        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postReactionRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var postReact = _postReactionRepository.GetByPostReactionId(id);
            if (postReact != null)
            {
                NotFound();
            }
            return Ok(postReact);
        }

        [HttpGet("post/{id}")]
        public IActionResult GetByPost(int id)
        {
            var postReact = _postReactionRepository.GetPostReactionByPostId(id);
            if (postReact != null)
            {
                NotFound();
            }
            return Ok(postReact);
        }

        [HttpPost]
        public IActionResult Post(PostReaction postReaction)
        {
            _postReactionRepository.Add(postReaction);
            return CreatedAtAction("Get", new { id = postReaction.Id }, postReaction);
        }

        [HttpPut("{id}")]
        public IActionResult EditPostReaction(PostReaction pr)
        {

            _postReactionRepository.Update(pr);
            return Ok(pr);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postReactionRepository.Delete(id);
            return NoContent();
        }


    }
}
