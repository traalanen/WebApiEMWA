//retrieves the configuration and initializes the index page object
class Configuration {
   
    constructor() {
        this.assistantUri = 'api/configuration';
        this.load();
    }

    load() {
        $.ajax({
            type: 'GET',
            url: this.assistantUri,
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            },
            success: function (data) {
                var configuration = data;
                //initialize the page scripts
                new IndexPage(configuration); 
            }
        });
    }
}
