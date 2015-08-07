var require = require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl : './resources/js',
    paths : {
        'jquery' : './bower_components/jquery/dist/jquery.min',
        'handlebars' : './bower_components/handlebars/handlebars',
        'text' : './bower_components/requirejs-text/text',
        'underscore' : './bower_components/underscore/underscore-min'
    },
    shim : {
        'text' : {
            deps : ['require']
        }
    }
});

require([
    'todoApp/todoApp'

], function (todoApp) {
    "use strict";

    new todoApp();
});