using Microsoft.EntityFrameworkCore;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Repositories
{
    public class PostReactionRepository
    {
        private readonly ApplicationDbContext _context;
        public PostReactionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostReaction> GetAll()
        {
            return _context.PostReaction
                .Include(pr => pr.Post)
               .Include(pr => pr.Reaction)
               .Include(pr => pr.UserProfile).ToList();
        }

        public PostReaction GetByPostReactionId(int id)
        {
            return _context.PostReaction
               .FirstOrDefault(pr => pr.Id == id);
        }

        public List<PostReaction> GetPostReactionByPostId(int id)
        {
            return _context.PostReaction
               .Include(pr => pr.Post)
               .Include(pr => pr.Reaction)
               .Include(pr => pr.UserProfile)
               .OrderBy(pr => pr.ReactionId)
               .Where(pr => pr.PostId == id)
               .ToList();

        }


        public void Add(PostReaction pr)
        {
            _context.Add(pr);
            _context.SaveChanges();
        }

        public void Update(PostReaction pr)
        {
            _context.Entry(pr).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var pr = GetByPostReactionId(id);
            _context.PostReaction.Remove(pr);
            _context.SaveChanges();
        }
    }
}
