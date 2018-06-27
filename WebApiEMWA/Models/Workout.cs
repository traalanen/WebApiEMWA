using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiEMWA.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string EquipmentUsed { get; set; }
        public string ExercisePerformed { get; set; }
        public string Comments { get; set; }
        public int WorkoutLength { get; set; }
        public int RepsPerMinute { get; set; }
        public string Description
        {
            get
            {
                //Example: 20 minute row, 10 pushups
                return $"{WorkoutLength} minute {EquipmentUsed}, {RepsPerMinute} {ExercisePerformed}";
            }
        }
    }
}
