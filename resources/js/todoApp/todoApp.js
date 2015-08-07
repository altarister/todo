define([
    'jquery',
    'todoApp/controllers/TodoController'

], function ($, TodoController) {
    "use strict";

    var TodoApp = function () {
        new TodoController();
    };

    return TodoApp;
});