class Workout extends TemplateHandler {

    constructor() {
        super();
        this.workoutUri = 'api/workout';
        this.dateFormat = Workout.defaultDateFormat;
        this.activeTemplate = '/templates/workout-active.html';
        this.logviewTemplate = '/templates/workout-log-view.html';
    }

    getDate() {
        return moment().format(this.dateFormat);
    }

    static get defaultDateFormat() {
        return 'YYYY/MM/DD, dddd hh:mm A';
    }

    //use the Workout defaultDateFormat
    static formatWorkoutDate(workout) {
        workout.date = moment(workout.date).format(Workout.defaultDateFormat);
        return workout;
    }

    value() {
        return {
            'date': this.getDate(),
            'equipmentUsed': $(PageElements.buttons.activity).text(),
            'exercisePerformed': $(PageElements.buttons.exercise).text(),
            'comments': $(PageElements.textareas.comments).text(),
            'workoutLength': $(PageElements.spans.minutes).text(),
            'repsPerMinute': $(PageElements.spans.repetitions).text()
        };
    }

    save(onSuccess, loadedWorkout) {

        //use the loaded workout if existing otherwise get it from the page
        let workout = loadedWorkout ? loadedWorkout : this.value();

        $.ajax({
            url: this.workoutUri,
            type: 'POST',
            accepts: 'application/json',
            contentType: 'application/json',
            data: JSON.stringify(workout),
            success: function (workout) {
                if (onSuccess) {
                    onSuccess(workout);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }

    updateComment(id, comments, onSuccess) {
        let workout = this.value();
        workout.id = id;
        workout.comments = comments;
        $.ajax({
            url: this.workoutUri + '/' + id,
            type: 'PUT',
            accepts: 'application/json',
            contentType: 'application/json',
            data: JSON.stringify(workout),
            success: function () {
                if (onSuccess) {
                    onSuccess();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }

    delete(id, onSuccess) {
        $.ajax({
            type: 'DELETE',
            url: this.workoutUri + '/' + id,
            success: function () {
                if (onSuccess) {
                    onSuccess();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }

    load(id, onSuccess) {
        $.ajax({
            type: 'GET',
            url: this.workoutUri + '/' + id,
            success: function (workout) {
                if (onSuccess) {
                    onSuccess(workout);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }

    loadLogView(id) {
        //load and set the fields on the modal dialog template for the item
        this.load(id, (loadedWorkout) => {
            this.loadLogViewTemplate(loadedWorkout);
            //add the id to the close button
            $(PageElements.buttons.closeItem).data('id', loadedWorkout.id);
        });
    }

    loadLogViewTemplate(workout) {
        workout = Workout.formatWorkoutDate(workout);
        this.loadTemplate(this.logviewTemplate, PageElements.divs.logItem, workout);
    }

    loadActiveTemplate(workout, onSuccess) {
        this.loadTemplate(this.activeTemplate, PageElements.divs.active, workout, onSuccess);
    }

    startWorkout(reloadedWorkout) {
        //save and set the fields on the modal dialog 
        this.save((loadedWorkout) => {
            //load the template
            this.loadActiveTemplate(loadedWorkout, () => {
                //run the clock
                this.startTimer();
            });
        }, reloadedWorkout);
    }

    reStartWorkout(id) {
        //load the existing workout
        this.load(id, (loadedWorkout) => {
            //zero out the id
            loadedWorkout.id = 0;
            //update date
            loadedWorkout.date = this.getDate();
            loadedWorkout.comments = '';
            //start the 'new' workout
            this.startWorkout(loadedWorkout);
        });
    }

    startTimer() {
        //full format MM:SS 
        var formatFull = '%M:%S';
        //seconds for next exercise on the minute
        var formatSeconds = '%S';
        //get the total minutes of the workout
        var minutesTotal = $(PageElements.spans.minutes).text();
        //add the minutes total to current time to get the end time
        var finalDate = moment(jQuery.now()).add(minutesTotal, 'm').toDate();
        $(PageElements.spans.timeRemaining).countdown(finalDate, { defer: false })
            .on('update.countdown', function (event) {
                var remaining = event.strftime(formatFull);
                var seconds = event.strftime(formatSeconds);
                $(this).html(remaining);
                $(PageElements.spans.timeToNext).text(seconds);
            })
            .on('finish.countdown', function (event) {
                alert('Your workout is complete!');
                //do the stop button event
                $(PageElements.buttons.stop).click();
            })
            .countdown('start');
    }
}
