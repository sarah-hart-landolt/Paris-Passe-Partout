using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Models
{
    public class Collection
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public int UserProfileId { get; set; }

        public DateTime CreateDateTime { get; set; }

        public List<PostCollection> PostCollectionList { get; set; }


        public UserProfile UserProfile { get; set; }

    }
}
