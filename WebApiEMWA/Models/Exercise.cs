﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiEMWA.Models
{
    
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Exercise(string name)
        {
            this.Name = name;
        }
    }
}
