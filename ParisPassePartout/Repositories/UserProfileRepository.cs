using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ParisPassePartout.Data;
using ParisPassePartout.Models;

namespace ParisPassePartout.Repositories
{
    public class UserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                       .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public List<UserProfile> GetAll()
        {
            return _context.UserProfile
                .OrderBy(up => up.DisplayName)
                .ToList();
        }

        public UserProfile GetUserProfileById(int id)
        {
            return _context.UserProfile
                       .FirstOrDefault(up => up.Id == id);
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }

        public void Update(UserProfile userProfile)
        {
            _context.Entry(userProfile).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}