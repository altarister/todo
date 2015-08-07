define([
    'jquery',
    'handlebars',
    'text!todoApp/templates/todoListTemplate.hbs'

], function ($, Handlebars, todoListTemplate) {

    var TodoListView = function (options) {
        this.element = $(options.element);
    };
    TodoListView.prototype = {
        add: function(todoJSON){
            var template = Handlebars.compile(todoListTemplate);
            this.element.append(template([todoJSON]));
        },
        render: function(todoJSON){
            var template = Handlebars.compile(todoListTemplate);
            this.element.html(template(todoJSON));
        }
    };

    return TodoListView;
});