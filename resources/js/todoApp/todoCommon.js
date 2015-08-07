define([

], function () {
    "use strict";

    var state = {
        filter : 'all' // all(default), active, completed
    };

    return {
        setFilter: function(key){
            state.filter = key;
        },
        isFilterState: function(key){
            return state.filter === key;
        }
    };
});