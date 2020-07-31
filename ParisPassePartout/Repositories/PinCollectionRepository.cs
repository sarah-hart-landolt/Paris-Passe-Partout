using Microsoft.EntityFrameworkCore;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Repositories
{
    public class PinCollectionRepository
    {
        private readonly ApplicationDbContext _context;
        public PinCollectionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PinCollection> GetAll()
        {
            return _context.PinCollection
                .OrderBy(pc => pc.Name)
                .Include(p => p.UserProfile)
                .ToList();
        }

        public PinCollection GetById(int id)
        {
            return _context.PinCollection
               .FirstOrDefault(pc => pc.Id == id);
        }

        public void Add(PinCollection pc)
        {
            _context.Add(pc);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var pc = GetById(id);
            foreach (var postPinCollection in _context.PostPinCollection
                .Where(ppc => ppc.PinCollectionId == pc.Id))
            {
                _context.PostPinCollection.Remove(postPinCollection);
            }

            _context.PinCollection.Remove(pc);
            _context.SaveChanges();
        }
        public void Update(PinCollection pc)
        {
            _context.Entry(pc).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
