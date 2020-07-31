using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Models
{
    public class PostPinCollection
    {

        public int Id { get; set; }
        public int PostId { get; set; }
        public int PinCollectionId { get; set; }
        public Post Post { get; set; }
        public PinCollection PinCollection { get; set; }
    }
}
