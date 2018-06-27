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
    public class WorkoutController : BaseApiController
    {
        public WorkoutController(DefaultContext context) :
            base(context)
        {
        }
        
        [HttpGet("{id}", Name = "GetWorkout")]
        public ActionResult<Workout> GetWorkoutById(int id)
        {
            var item = _context.Workouts.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpPost]
        public IActionResult Create(Workout item)
        {
            _context.Workouts.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetWorkout", new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateWorkoutComments(int id, Workout item)
        {
            var workout = _context.Workouts.Find(id);
            if (workout == null)
            {
                return NotFound();
            }

            workout.Comments = item.Comments;

            _context.Workouts.Update(workout);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var workout = _context.Workouts.Find(id);
            if (workout == null)
            {
                return NotFound();
            }

            _context.Workouts.Remove(workout);
            _context.SaveChanges();
            return NoContent();
        }
    }
}