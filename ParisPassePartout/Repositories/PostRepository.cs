using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ParisPassePartout.Data;
using ParisPassePartout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;
using System.Collections;
using System.Threading.Tasks.Dataflow;

namespace ParisPassePartout.Repositories
{
    public class PostRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly string _connectionString;

        public PostRepository(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _connectionString = configuration.GetConnectionString("DefaultConnection");

        }

        public SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }
        public List<Post> GetAll()
        {
            return _context.Post
                           .Include(p => p.UserProfile)
                           .Include(p => p.CommentList)
                           .Include(p => p.Category)
                           .OrderByDescending(p => p.CreateDateTime)
                           .ToList();
        }

        public List<Post> GetAllCUPosts(int id)
        {
            DateTime today = DateTime.Now;
            return _context.Post
                           .Include(p => p.UserProfile)
                           .Include(p => p.CommentList)
                           .Include(p => p.Category)
                           .Where(p => p.UserProfileId == id)
                           .OrderByDescending(p => p.CreateDateTime)
                           .ToList();
        }


        public Post GetById(int id)
        {
            return _context.Post
                           .Include(p => p.UserProfile)
                           .Include(p => p.CommentList)
                           .Include(p => p.Category)
                           .FirstOrDefault(p => p.Id == id);
        }

        public void Add(Post post)
        {
            _context.Add(post);
            _context.SaveChanges();
        }

        public void Update(Post post)
        {
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var post = GetById(id);
            foreach (var postCollection in _context.PostCollection
               .Where(pc => pc.PostId == post.Id))
            {
                _context.PostCollection.Remove(postCollection);
            }
            _context.Post.Remove(post);
            _context.SaveChanges();
        }

        public List<Post> Search(string searchString)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                string[] searchWordsArray = searchString.Split(' ');
                IEnumerable<string> newWordsArray = searchWordsArray.Select(word => $"%{word}%");
                var posts = new List<Post>();
                foreach (string searchWords in newWordsArray)
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        SELECT  p.Id, p.Name, p.Content, p.CreateDateTime, p.CategoryId, p.Address, p.Longitude, p.Latitude, 
                               p.UserProfileId, p.ImageLocation, up.Id AS upId, up.DisplayName AS upDisplayName, up.Email, up.IsActivated, 
                               up.FirebaseUserId AS upFirebaseUserId, up.FirstName AS upFirstName,
                               up.LastName AS upLastName, up.CreateDateTime AS upCreateDateTime,
                               up.ImageLocation AS UpImageLocation, c.Id AS CatId, c.Name AS CatName

                        FROM Post p
                    
                        JOIN Category c ON c.Id = p.CategoryId
                        JOIN UserProfile up ON up.Id = p.UserProfileId
                      
                        WHERE LOWER(p.Name) LIKE @searchString
                        OR LOWER(cast(p.Content as varchar(max))) LIKE @searchString
                        OR LOWER(c.Name) LIKE @searchString
                        OR LOWER(up.DisplayName) LIKE @searchString
                        OR LOWER(up.LastName) LIKE @searchString";



                        cmd.Parameters.AddWithValue("@searchString", searchWords.ToLower());

                        var reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            Post post = new Post()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Content = reader.GetString(reader.GetOrdinal("Content")),
                                //OriginalPostId = reader.GetInt32(reader.GetOrdinal("OriginalPostId")),
                                //Phone = reader.GetString(reader.GetOrdinal("Phone")),
                                //Address = reader.GetString(reader.GetOrdinal("Address")),
                                //ZipCode = reader.GetInt32(reader.GetOrdinal("ZipCode")),
                                //Status = reader.GetString(reader.GetOrdinal("Status")),
                                //Website = reader.GetString(reader.GetOrdinal("Website")),
                                Longitude = reader.GetDouble(reader.GetOrdinal("Longitude")),
                                Latitude = reader.GetDouble(reader.GetOrdinal("Latitude")),
                                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                Category = new Category()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("CatId")),
                                    Name = reader.GetString(reader.GetOrdinal("CatName"))
                                },
                                UserProfile = new UserProfile()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UpId")),
                                    FirebaseUserId = reader.GetString(reader.GetOrdinal("UpFirebaseUserId")),
                                    DisplayName = reader.GetString(reader.GetOrdinal("UpDisplayName")),
                                    FirstName = reader.GetString(reader.GetOrdinal("UpFirstName")),
                                    LastName = reader.GetString(reader.GetOrdinal("UpLastName")),
                                    Email = reader.GetString(reader.GetOrdinal("Email")),
                                    IsActivated = reader.GetBoolean(reader.GetOrdinal("IsActivated")),
                                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("upCreateDateTime"))

                                }
                            };

                            if (!reader.IsDBNull(reader.GetOrdinal("ImageLocation")))

                            {
                                post.ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"));
                            }

                            if (!reader.IsDBNull(reader.GetOrdinal("upImageLocation")))

                            {
                                post.ImageLocation = reader.GetString(reader.GetOrdinal("upImageLocation"));
                            }

                            posts.Add(post);

                        }

                        reader.Close();

                    }
                }
                return posts.GroupBy(p => p.Id).Select(p => p.FirstOrDefault()).ToList();
            }
        }

    }
}
