using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public string ImageLocation { get; set; }
        public DateTime CreateDateTime { get; set; }

        [Required]
        [DisplayName("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [DisplayName("Author")]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public int OriginalPostId { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string Address{ get; set; }
        public int ZipCode { get; set; }
        public string Status { get; set; }
        public string Phone { get; set; }
        public string Website { get; set; }
        public Boolean HasTried { get; set; }


        //public List<Comment> CommentList { get; set; }
        //public List<PostTag> PostTagList { get; set; }

        //[NotMapped]
        //public bool IsCurrentUsers { get; set; } = false;
    }
}
