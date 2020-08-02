using Microsoft.EntityFrameworkCore;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Repositories
{
    public class SubscriptionRepository
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Subscription> GetAll()
        {
            return _context.Subscription.ToList();
        }
        public Subscription GetSubscription(int id)
        {
            return _context.Subscription
               .FirstOrDefault(s => s.Id == id);
        }

        public List<Post> GetBySubscriberProfileId(int id)
        {
            DateTime today = DateTime.Now;
            return _context.Subscription
               .Where(s => s.SubscriberUserProfileId == id && s.EndDateTime == null)
               .OrderByDescending(s => s.BeginDateTime)
               .SelectMany(s =>
                    _context.Post
                        .Where(p => p.UserProfileId == s.ProviderUserProfileId == true) 
                        .Include(p => p.UserProfile))
               .ToList();
        }

        public void Add(Subscription subscription)
        {
            _context.Add(subscription);
            _context.SaveChanges();
        }
        public void Update(Subscription subscription)
        {

            _context.Entry(subscription).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var subscription = GetSubscription(id);
            _context.Subscription.Remove(subscription);
            _context.SaveChanges();
        }
    }
}
