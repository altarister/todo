define([
    'jquery'

], function ($) {

    var TodoModel = function (todo) {
        this.record = todo;
    };
    TodoModel.prototype = {
        get: function(attrName){
            return this.record[attrName];
        },
        set: function(object){
            for(property in object){
                this.record[property] = object[property];
                // todo : 서버에 수정요청 추가작업 필요함
            }
            return this.toJSON();
        },
        remove: function(id){
            // todo : 서버에 삭제요청 추가작업 필요함
        },
        toJSON: function(){
            return $.extend(true, {}, this.record);
        }
    };

    return TodoModel;
});