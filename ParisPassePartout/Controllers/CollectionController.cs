using Microsoft.AspNetCore.Authorization;
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
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private readonly CollectionRepository _collectionRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public CollectionController(ApplicationDbContext context, IConfiguration configuration)
        {
            _collectionRepository = new CollectionRepository(context);
            _userProfileRepository = new UserProfileRepository(context, configuration);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_collectionRepository.GetAll());
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var collection = _collectionRepository.GetById(id);
            if (collection != null)
            {
                NotFound();
            }
            return Ok(collection);
        }

        [HttpGet("pins/{userProfileId}")]
        public IActionResult GetAllCommentsByPostId(int userProfileId)
        {
            return Ok(_collectionRepository.GetCollectionByUser(userProfileId));
        }

        [HttpPost]
        public IActionResult Post(Collection collection)
        {
            collection.CreateDateTime = DateTime.Now;
            var currentUser = GetCurrentUserProfile();
            collection.UserProfileId = currentUser.Id;

            _collectionRepository.Add(collection);
            return CreatedAtAction(nameof(Get), new { id = collection.Id }, collection);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Collection pc)
        {
            if (id != pc.Id)
            {
                return BadRequest();
            }

            _collectionRepository.Update(pc);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _collectionRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
