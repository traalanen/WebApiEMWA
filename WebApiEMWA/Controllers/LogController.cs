using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiEMWA.Models;

namespace WebApiEMWA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : BaseApiController
    {
        public LogController(DefaultContext context) :
            base(context)
        {
        }
        // GET: api/Log
        [HttpGet]
        public IEnumerable<Workout> Get()
        {
            //order by ascending date
            return _context.Workouts.OrderBy(w => w.Date);
        }
    }
}
