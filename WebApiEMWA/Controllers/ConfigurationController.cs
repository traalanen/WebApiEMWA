using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApiEMWA.Models;

namespace WebApiEMWA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationController : BaseApiController
    {
        public ConfigurationController(DefaultContext context) :
            base(context)
        {
        }

        [HttpGet(Name = "GetConfiguration")]
        public ActionResult<DefaultConfiguration> GetConfiguration()
        {
            var configuration = _context.Configuration.First();
            if (configuration == null)
            {
                return NotFound();
            }
            return configuration;
        }
    }
}
