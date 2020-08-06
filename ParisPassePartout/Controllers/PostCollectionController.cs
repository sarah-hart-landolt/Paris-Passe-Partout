using Microsoft.AspNetCore.Mvc;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using ParisPassePartout.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostCollectionController : ControllerBase
    {
        private readonly PostCollectionRepository _postCollectionRepository;

        public PostCollectionController(ApplicationDbContext context)
        {
            _postCollectionRepository = new PostCollectionRepository(context);

        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postCollectionRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(PostCollection pc)
        {
            _postCollectionRepository.Add(pc);
            return CreatedAtAction("Get", new { id = pc.Id }, pc);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postCollectionRepository.Delete(id);
            return NoContent();
        }
    }
}
