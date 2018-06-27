//elements used on the page
class PageElements {
    static get buttons() {
        return {
            start: '#btnStart',
            stop: '#btnStop',
            restart: '.btn-restart',
            log: '#btnLog',
            view: '.btn-view',
            closeItem: '#btnCloseItem',
            activity: '#btnActivity',
            exercise: '#btnExercise',
            delete: '.btn-delete-workout',
            about: '#btnAbout'
        }
    }

    static get menus() {
        return {
            activityItems: '#menuActivityItems',
            exerciseItems: '#menuExerciseItems'
        }
    }

    static get sliders() {
        return {
            workout: '#workoutSlider',
            repetitions: '#repetitionsSlider'
        }
    }

    static get spans() {
        return {
            activity: '#spanActivity',
            exercise: '#spanExercise',
            minutes: '#spanMinutes',
            repetitions: '#spanRepetitions',
            timeRemaining: '#spanTimeRemaining',
            timeToNext: '#spanTimeToNext'
        }
    }

    static get divs() {
        return {
            logItems: '#workoutLogItems',
            logItem: '#workoutLogItem',
            active: '#workoutActive',
            about: '#modalAboutDetail'
        }
    }

    static get textareas() {
        return {
            comments: '#workoutComment'
        }
    }

    static get modals() {
        return {
            logView: '#modalLogView', 
            log: 'modalLog'
        }
    }
}