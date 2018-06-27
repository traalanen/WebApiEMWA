using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiEMWA.Models
{
    public class WorkoutConfiguration
    {
        public List<Workout> Workouts { get; set; }
        public WorkoutConfiguration()
        {
            this.Workouts = new List<Workout>
            {
                ////dummy item for our in memory database so we have something to load for the log, using inline vs ctor as example
                //new Workout
                //{
                //    Date = new DateTime(2018, 06, 22, 5, 22, 0),
                //    Comments = "Decent warmup, 300 burpees is pretty easy in 30 minutes.",
                //    EquipmentUsed = "Rower",
                //    ExercisePerformed = "burpees",
                //    WorkoutLength = 30,
                //    RepsPerMinute = 10
                //}
            };
        }

    }
}
