using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using ParisPassePartout.Repositories;

namespace ParisPassePartout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostRepository _postRepository;
        private readonly UserProfileRepository _upRepository;
        private readonly PostTagRepository _ptRepository;
        private readonly TagRepository _tagRepository;
        public PostController(ApplicationDbContext context, IConfiguration configuration)
        {
            _postRepository = new PostRepository(context, configuration);
            _upRepository = new UserProfileRepository(context, configuration);
            _ptRepository = new PostTagRepository(context);
            _tagRepository = new TagRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetById(id);
            var currentUser = GetCurrentUserProfile();

            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet ("myposts")]
        public IActionResult GetPostsByCurrentUser(int id)
        {
            var currentUser = GetCurrentUserProfile();
            return Ok(_postRepository.GetAllCUPosts(currentUser.Id));
        }

        [HttpGet("myposts/{id}")]
        public IActionResult GetPostsByUser(int id)
        {
            return Ok(_postRepository.GetAllCUPosts(id));
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            var currentUser = GetCurrentUserProfile();
            post.UserProfileId = currentUser.Id;
            post.CreateDateTime = DateTime.Now;
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            var currentUser = GetCurrentUserProfile();
            post.UserProfileId = currentUser.Id;
            post.CreateDateTime = DateTime.Now;
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string searchString)
        {
            if (String.IsNullOrEmpty(searchString))
            {
                return Ok(_postRepository.GetAll());
            }
            else
            {
                return Ok(_postRepository.Search(searchString));

            }
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _upRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
