﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ParisPassePartout.Models
{
    public class Category
    {
         
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Icon { get; set; }


        public List<Post> PostList { get; set; }

        public Boolean IsDeleted { get; set; }
    }
}
    

