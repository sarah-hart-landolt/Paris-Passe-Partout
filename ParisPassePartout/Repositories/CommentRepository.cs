using Microsoft.EntityFrameworkCore;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Repositories
{
    public class CommentRepository
    {

        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<Comment> GetAllComments()
        {
            return _context.Comment
                       .Include(c => c.Post)
                       .Include(c => c.UserProfile)
                       .OrderByDescending(c => c.CreateDateTime)
                       .ToList();

        }
        public List<Comment> GetCommentByPostId(int postId)
        {
            return _context.Comment
                       .Include(c => c.Post)
                       .Include(c => c.UserProfile)
                       .Where(c => c.PostId == postId)
                       .OrderByDescending(c => c.CreateDateTime)
                       .ToList();

        }

        public void Add(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public Comment GetById(int id)
        {
            return _context.Comment.FirstOrDefault(c => c.Id == id);
        }

        public void Delete(int id)
        {
            var comment = GetById(id);
            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }
    }
}
