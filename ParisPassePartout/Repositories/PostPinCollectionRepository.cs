using ParisPassePartout.Data;
using ParisPassePartout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Repositories
{
    public class PostPinCollectionRepository
    {
        private readonly ApplicationDbContext _context;

        public PostPinCollectionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostPinCollection> GetAll()
        {
            return _context.PostPinCollection.ToList();
        }

        public PostPinCollection GetByPCId(int id)
        {
            return _context.PostPinCollection
               .FirstOrDefault(pt => pt.Id == id);
        }

        public void Add(PostPinCollection ppc)
        {
            _context.Add(ppc);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var ppc = GetByPCId(id);
            _context.PostPinCollection.Remove(ppc);
            _context.SaveChanges();
        }
    }
}
