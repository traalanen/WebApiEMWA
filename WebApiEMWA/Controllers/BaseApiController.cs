using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApiEMWA.Models;

namespace WebApiEMWA.Controllers
{
    public class BaseApiController : ControllerBase
    {
        protected readonly DefaultContext _context;

        public BaseApiController(DefaultContext context)
        {
            _context = context;

            if (!DefaultContext.ContextLoaded)
            {

                if (_context.Configuration.Count() == 0)
                {
                    //add our configuration
                    _context.Configuration.Add(new DefaultConfiguration());
                    _context.SaveChanges();
                }
                if (_context.Workouts.Count() == 0)
                {
                    //add some default workouts for the log
                    _context.Workouts.AddRange(new WorkoutConfiguration().Workouts);
                    _context.SaveChanges();
                }
                DefaultContext.ContextLoaded = true;
            }
        }
    }
}
