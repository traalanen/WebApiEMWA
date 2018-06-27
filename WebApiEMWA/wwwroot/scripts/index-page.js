//responsible for the initialization of the elements on the page
class IndexPage {

    constructor(configuration) {
        this.configuration = configuration;
        this.initDropdowns();
        this.initSliders();
        this.initButtons();
        this.initModals();
    }

    initDropdowns() {
        //set the click event to update the drop down title with the clicked item text
        $(PageElements.menus.activityItems).on('click', 'button', function () {
            $(this).closest('.dropdown').find(".btn:first-child").text($(this).text());
            $(this).closest('.dropdown').find(".btn:first-child").val($(this).text());
            $(PageElements.spans.activity).text($(this).text());
        });

        //create the drop down items for activities from the server configuration json
        $(this.configuration.activities).map(function () {
            var button = $('<button/>').text(this.description)
                .data('id', this.id)
                .addClass('dropdown-item');
            $(PageElements.menus.activityItems).append(button);
        });

        //set the click event to update the drop down title with the clicked item text
        $(PageElements.menus.exerciseItems).on('click', 'button', function () {
            $(this).closest('.dropdown').find(".btn:first-child").text($(this).text());
            $(this).closest('.dropdown').find(".btn:first-child").val($(this).text());
            $(PageElements.spans.exercise).text($(this).text());
        });

        //create the drop down items for exercises from the server configuration json
        $(this.configuration.exercises).map(function () {
            var button = $('<button/>').text(this.name)
                .data('id', this.id)
                .addClass('dropdown-item');
            $(PageElements.menus.exerciseItems).append(button);
        });

        //set first items by clicking on the first child
        $(PageElements.menus.activityItems).children('.dropdown-menu button')[0].click();
        $(PageElements.menus.exerciseItems).children('.dropdown-menu button')[0].click();
    }

    initSliders() {
        //set the configuration for the sliders from the server configuration json
        $(PageElements.sliders.workout).slider({
            tooltip: 'always',
            id: "slider1",
            min: this.configuration.workoutTimeMinimum,
            max: this.configuration.workoutTimeMaximum,
            value: this.configuration.workoutTimeDefault
            })
            .on('slide', function (slideEvent) {
                $(PageElements.spans.minutes).text(slideEvent.value);
            })
            .data('slider');

        //set the label for the minutes
        $(PageElements.spans.minutes).text(this.configuration.workoutTimeDefault);

        $(PageElements.sliders.repetitions).slider({
            tooltip: 'always',
            id: "slider2",
            min: this.configuration.exerciseRepsMinimum,
            max: this.configuration.exerciseRepsMaximum,
            value: this.configuration.exerciseRepsDefault
        })
            .on('slide', function (slideEvent) {
                $(PageElements.spans.repetitions).text(slideEvent.value);
            })
            .data('slider');

        //set the label for the repetitions
        $(PageElements.spans.repetitions).text(this.configuration.exerciseRepsDefault);

        //once the sliders have initialized we can allow the user to click the Log or Start buttons
        $(PageElements.buttons.log).prop('disabled', false);
        $(PageElements.buttons.start).prop('disabled', false);
    }

    initButtons() {
        //set click event for about button
        $(document).on('click', PageElements.buttons.about, function () {
            //show them the about modal dialog
            new About().loadAboutTemplate();
        });

        //set click event for log button
        $(document).on('click', PageElements.buttons.log, function () {
            let workoutLog = new WorkoutLog();
            workoutLog.load();
        });

        //set click event for start button
        $(document).on('click', PageElements.buttons.start, function () {
            new Workout().startWorkout();
        });

        //set click event for restart button
        $(document).on('click', PageElements.buttons.restart, function () {
            let id = $(this).data('id');
            new Workout().reStartWorkout(id);
        });

        //set click event for view button
        $(document).on('click', PageElements.buttons.view, function() {
            let id = $(this).data('id');
            //show them the (updateable) log
            new Workout().loadLogView(id);
        });

        //set click event for close log item button
        $(document).on('click', PageElements.buttons.closeItem, function () {
            let id = $(this).data('id');
            let comments = $(PageElements.textareas.comments).val();
            //save item
            new Workout().updateComment(id, comments, () => {
                //re-open full log
                $(PageElements.buttons.log).click();
            });
        });

        //set click event for delete log item button
        $(document).on('click', PageElements.buttons.delete, function () {
            if (confirm('Are you sure you want to delete this workout?')) {
                let id = $(this).data('id');
                new Workout().delete(id, () => {
                    //close log
                    $(PageElements.modals.log).modal('hide');
                    //reload
                    $(PageElements.buttons.log).click();
                });
            }
        });

        //set click event for stop button
        $(document).on('click', PageElements.buttons.stop, () => {
            $(PageElements.spans.timeRemaining).countdown('stop');
            let id = $(PageElements.buttons.stop).data('id');
            //view the log and allow addition of comments
            new Workout().loadLogView(id);
            $(PageElements.modals.logView).modal('show');
        });
    }

    initModals() {
        //load 'about' modal on page load
        $(PageElements.buttons.about).click();

        //default 
        $('#modalLogView').on('shown.bs.modal', function () {
            $('#workoutComment').focus();
        });
    }
}