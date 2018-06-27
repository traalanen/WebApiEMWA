class TemplateHandler {
    constructor() {
    }

    loadTemplate(template, element, jsonObject, onSuccess) {
        $.get(template, (value) => {
            //get the template
            var loadedTemplate = $.templates(value);
            //render
            var html = loadedTemplate.render(jsonObject);
            //push it out the page
            $(element).html(html);
            //if we have a method to run after template load...run it
            if(onSuccess) {
                onSuccess();
            }
        });
    }
}