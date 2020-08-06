using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Models
{
    public class PostCollection
    {

        public int Id { get; set; }
        public int PostId { get; set; }
        public int CollectionId { get; set; }
        public Post Post { get; set; }
        public Collection Collection { get; set; }
    }
}
