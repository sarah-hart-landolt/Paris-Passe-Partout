using ParisPassePartout.Data;
using ParisPassePartout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Repositories
{
    public class PostCollectionRepository
    {
        private readonly ApplicationDbContext _context;

        public PostCollectionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostCollection> GetAll()
        {
            return _context.PostCollection.ToList();
        }

        public PostCollection GetByPCId(int id)
        {
            return _context.PostCollection
               .FirstOrDefault(pt => pt.Id == id);
        }

        public void Add(PostCollection ppc)
        {
            _context.Add(ppc);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var ppc = GetByPCId(id);
            _context.PostCollection.Remove(ppc);
            _context.SaveChanges();
        }
    }
}
