class WorkoutLog extends TemplateHandler {
    
    constructor() {
        super();
        this.logUri = 'api/log';
        this.template = '/templates/workout-log.html';
        this.element = PageElements.divs.logItems;
    }

    load() {
        $.ajax({
            type: 'GET',
            url: this.logUri,
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            },
            success: (workouts) => {
                this.loadLogTemplate(workouts);
            }
        });
    }

    //shim to format the dates for the templates
    formatDates(workouts) {
        return workouts.map((workout) => {
            return Workout.formatWorkoutDate(workout);
        });
    }

    loadLogTemplate(workouts) {
        workouts = this.formatDates(workouts);
        this.loadTemplate(this.template, this.element, workouts);
    }
}
