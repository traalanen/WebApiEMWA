using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiEMWA.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Equipment { get; set; }
        public string Description { get; set; }
        public Activity(string equipment, string description)
        {
            this.Equipment = equipment;
            this.Description = description;
        }
    }
}
