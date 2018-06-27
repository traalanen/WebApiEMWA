//this is the only entry point for document.ready - it all starts here
//load begins with start.js -> configuration.js -> index-page.js which will utilize all the other javascript classes
$(document).ready(function () {
    new Configuration();
});