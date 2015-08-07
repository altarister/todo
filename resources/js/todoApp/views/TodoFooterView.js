define([
    'jquery',
    'handlebars',
    'text!todoApp/templates/todoFooterTemplate.hbs'

], function ($, Handlebars, todoFooterTemplate) {

    var TodoFooterView = function (options) {
        this.element = $(options.element);
    };
    TodoFooterView.prototype = {
        render: function(collection, todoCommon){
            var result = {
                itemsLeft : collection.remain().length,
                filterAll : todoCommon.isFilterState('all'),
                filterActive : todoCommon.isFilterState('active'),
                filterCompleted : todoCommon.isFilterState('completed'),
                isClearCompleted : collection.completed().length
            };

            var template = Handlebars.compile(todoFooterTemplate);
            this.element.html(template(result));
        }
    };

    return TodoFooterView;
});