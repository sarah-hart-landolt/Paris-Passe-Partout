using Microsoft.EntityFrameworkCore;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Repositories
{
    public class ReactionRepository
    {
        private readonly ApplicationDbContext _context;

        public ReactionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Reaction> GetAll()
        {
            return _context.Reaction
                .ToList();
        }


        public Reaction GetById(int id)
        {
            return _context.Reaction

               .FirstOrDefault(r => r.Id == id);
        }

        public void Add(Reaction Reaction)
        {
            _context.Add(Reaction);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var reaction = GetById(id);
            foreach (var postReaction in _context.PostReaction
                .Where(pr => pr.ReactionId == reaction.Id))
            {
                _context.PostReaction.Remove(postReaction);
            }

            _context.Reaction.Remove(reaction);
            _context.SaveChanges();
        }
        public void Update(Reaction reaction)
        {
            _context.Entry(reaction).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
