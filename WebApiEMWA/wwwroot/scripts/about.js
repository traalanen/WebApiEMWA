class About extends TemplateHandler {
    constructor() {
        super();
        this.aboutTemplate = '/templates/about.html';
    }

    loadAboutTemplate() {
        this.loadTemplate(this.aboutTemplate, PageElements.divs.about);
    }
}