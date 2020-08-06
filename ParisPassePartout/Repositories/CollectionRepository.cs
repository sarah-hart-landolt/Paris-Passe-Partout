using Microsoft.EntityFrameworkCore;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Repositories
{
    public class CollectionRepository
    {
        private readonly ApplicationDbContext _context;
        public CollectionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Collection> GetAll()
        {
            return _context.Collection
                .OrderBy(pc => pc.Name)
                .Include(p => p.UserProfile)
                .Include(c => c.PostCollectionList)
                .ThenInclude(pc => pc.Post)
                .ToList();
        }

        public Collection GetById(int id)
        {
            return _context.Collection
                     .Include(c => c.PostCollectionList)
                      .ThenInclude(pc => pc.Post)
                      .FirstOrDefault(c => c.Id == id);

                          
            
        }

        public List<Collection> GetCollectionByUser(int userProfileId)
        {
            return _context.Collection
                       .Include(c => c.UserProfile)
                       .Where(c => c.UserProfileId == userProfileId)
                        .Include(c => c.PostCollectionList)
                      .ThenInclude(pc => pc.Post)
                       .OrderBy(c => c.Name)
                       .ToList();

        }

        public void Add(Collection pc)
        {
            _context.Add(pc);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var pc = GetById(id);
            foreach (var postPinCollection in _context.PostCollection
                .Where(ppc => ppc.CollectionId == pc.Id))
            {
                _context.PostCollection.Remove(postPinCollection);
            }

            _context.Collection.Remove(pc);
            _context.SaveChanges();
        }
        public void Update(Collection pc)
        {
            _context.Entry(pc).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
