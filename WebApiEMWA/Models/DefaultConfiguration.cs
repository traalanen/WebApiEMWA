using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiEMWA.Models;

namespace WebApiEMWA.Models
{
    public class DefaultConfiguration
    {
        public int Id { get; set; }
        public List<Activity> Activities { get; set; }
        public List<Exercise> Exercises { get; set; }
        public int WorkoutTimeMinimum { get; set; }
        public int WorkoutTimeMaximum { get; set; }
        public int WorkoutTimeDefault { get; set; }
        public int ExerciseRepsMinimum { get; set; }
        public int ExerciseRepsMaximum { get; set; }
        public int ExerciseRepsDefault { get; set; }


        public DefaultConfiguration()
        {
            this.Activities = new List<Activity> {
                new Activity("Treadmill", "run on the treadmill"),
                new Activity("Row", "row"),
                new Activity("Stationary Bicycle", "ride a bike") };
            this.Exercises = new List<Exercise> {
                new Exercise("pushups"),
                new Exercise("burpees"),
                new Exercise("air squats") };
            this.WorkoutTimeMinimum = 0;
            this.WorkoutTimeMaximum = 100;
            this.WorkoutTimeDefault = 20;
            this.ExerciseRepsMinimum = 0;
            this.ExerciseRepsMaximum = 50;
            this.ExerciseRepsDefault = 5;
        }
    }
}
