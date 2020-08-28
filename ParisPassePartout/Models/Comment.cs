using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public int PostId { get; set; }

        public Post Post { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        [Required(ErrorMessage = "Enter a comment")]
        public string Content { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }
    }
}
