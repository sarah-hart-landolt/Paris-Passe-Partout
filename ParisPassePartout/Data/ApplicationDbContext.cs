﻿using Microsoft.EntityFrameworkCore;
using ParisPassePartout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Post> Post { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<PostTag> PostTag { get; set; }
        public DbSet<Subscription> Subscription { get; set; }
        public DbSet<PostReaction> PostReaction { get; set; }
        public DbSet<Reaction> Reaction { get; set; }
        public DbSet<Collection> Collection{ get; set; }
        public DbSet<PostCollection> PostCollection { get; set; }



    }
}
