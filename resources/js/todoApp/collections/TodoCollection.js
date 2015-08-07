define([
    'jquery',
    'underscore'

], function ($, _) {

    var TodoModel = function () {
        this.records = [];
    };
    TodoModel.prototype = {
        add: function (todo) {
            this.records.push(todo);
        },
        remove: function(todo){
            this.records = _.without(this.records, todo);
            console.log(this.records);
        },
        findID: function(id){
            var length = this.records.length,
                todo;
            for(var i=0; i<length; i++){
                if(this.records[i].get('id') == id){
                    todo = this.records[i];
                }
            }
            return todo;
        },
        remain: function(){
            return _.reject(this.records, function(todo){
                return todo.get('isCompleted');
            });
        },
        completed: function(){
            return _.reject(this.records, function(todo){
                return !todo.get('isCompleted');
            });
        },
        clearCompleted: function(){
            this.records = _.reject(this.records, function(todo){
                return todo.get('isCompleted');
            });
        },
        toJSON: function(collection){
            return $.map(collection || this.records, function(todo){
                return todo.toJSON();
            });
        }
    };

    return TodoModel;
});