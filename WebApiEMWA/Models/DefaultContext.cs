using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebApiEMWA.Models
{
    public class DefaultContext : DbContext
    {
        public DefaultContext(DbContextOptions<DefaultContext> options)
            : base(options)
        {
        }

        //TODO: caching would be better than static
        public static bool ContextLoaded { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<DefaultConfiguration> Configuration { get; set; }
    }
}
