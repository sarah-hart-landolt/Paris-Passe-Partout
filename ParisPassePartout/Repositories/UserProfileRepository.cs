using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ParisPassePartout.Data;
using ParisPassePartout.Models;

namespace ParisPassePartout.Repositories
{
    public class UserProfileRepository
    {
        private readonly ApplicationDbContext _context;
        //private readonly string _connectionString;


        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
            //_connectionString = configuration.GetConnectionString("DefaultConnection");
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

        //public List<UserProfile> Search(string searchString)
        //{
        //    using (var conn = new SqlConnection(_connectionString))
        //    {
        //        conn.Open();

        //        string[] searchWordsArray = searchString.Split(' ');
        //        IEnumerable<string> newWordsArray = searchWordsArray.Select(word => $"%{word}%");
        //        var userProfiles = new List<UserProfile>();
        //        foreach (string searchWords in newWordsArray)
        //        {
        //            using (var cmd = conn.CreateCommand())
        //            {
        //                cmd.CommandText = @"
        //                SELECT up.Id AS upId, 
        //                       up.DisplayName AS upDisplayName, 
        //                       up.FirstName AS upFirstName,
        //                       up.LastName AS upLastName, 
        //                       up.CreateDateTime AS upCreateDateTime,
        //                       up.ImageLocation AS UpImageLocation

        //                FROM UserProfile up
               
                      
        //                WHERE LOWER(up.FirstName) LIKE @searchString
        //                OR LOWER(up.DisplayName) LIKE @searchString
        //                OR LOWER(up.LastName) LIKE @searchString";



        //                cmd.Parameters.AddWithValue("@searchString", searchWords.ToLower());

        //                var reader = cmd.ExecuteReader();

        //                while (reader.Read())
        //                {
        //                    UserProfile userProfile = new UserProfile()
        //                    {

        //                        Id = reader.GetInt32(reader.GetOrdinal("UpId")),
        //                        DisplayName = reader.GetString(reader.GetOrdinal("UpDisplayName")),
        //                        FirstName = reader.GetString(reader.GetOrdinal("UpFirstName")),
        //                        LastName = reader.GetString(reader.GetOrdinal("UpLastName")),
        //                        CreateDateTime = reader.GetDateTime(reader.GetOrdinal("upCreateDateTime"))


        //                    };

        //                    if (!reader.IsDBNull(reader.GetOrdinal("UpImageLocation")))

        //                    {
        //                        userProfile.ImageLocation = reader.GetString(reader.GetOrdinal("upImageLocation"));
        //                    }

        //                    userProfiles.Add(userProfile);

        //                }

        //                reader.Close();

        //            }
        //        }
        //        return userProfiles.GroupBy(p => p.Id).Select(p => p.FirstOrDefault()).ToList();
        //    }
        //}
    }
}