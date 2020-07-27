using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Models
{
    public class PostReaction
    {

        public int Id { get; set; }
        public int PostId { get; set; }
        public int ReactionId { get; set; }
        public int UserProfileId { get; set; }
        public Post Post { get; set; }
        public Reaction Reaction { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
