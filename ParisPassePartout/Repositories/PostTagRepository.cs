using Microsoft.EntityFrameworkCore;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Repositories
{
    public class PostTagRepository
    {
        private readonly ApplicationDbContext _context;

        public PostTagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostTag> GetAll()
        {
            return _context.PostTag.ToList();
        }

        public PostTag GetByPostTagId(int id)
        {
            return _context.PostTag
               .FirstOrDefault(pt => pt.Id == id);
        }

        public void Add(PostTag pt)
        {
            _context.Add(pt);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var pt = GetByPostTagId(id);
            _context.PostTag.Remove(pt);
            _context.SaveChanges();
        }
    }
}
