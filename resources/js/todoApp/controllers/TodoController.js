define([
    'jquery',
    'utility/utility',

    'todoApp/todoCommon',
    'todoApp/controllers/TodoController',
    'todoApp/collections/TodoCollection',
    'todoApp/models/TodoModel',
    'todoApp/views/TodoListView',
    'todoApp/views/TodoFooterView'

], function (
    $,
    utility,

    todoCommon,
    TodoController,
    TodoCollection,
    TodoModel,
    TodoListView,
    TodoFooterView
) {
    "use strict";

    var todoCollection = new TodoCollection,
        todoListView,
        todoFooterView;

    var TodoApp = function () {
        var dom = (function () {
            var dom = {
                element: ".todoApp",
                ui: {
                    'todoCreate': '.todoApp-create',

                    'todoList'  : '.todoApp-todoList',
                    'todoListLi': '.todoApp-todoList-li',

                    'todoListTextArea'    : '.todoApp-todoList-li__text',
                    'todoListCheckbox'    : '.todoApp-todoList-li__text__checkbox',
                    'todoListModifyButton': '.todoApp-todoList-li__text__edit',
                    'todoListDeleteButton': '.todoApp-todoList-li__text__delete',

                    'todoListEditArea'             : '.todoApp-todoList-li__edit',
                    'todoListModifyInput'          : '.todoApp-todoList-li__edit__input',
                    'todoListModifyCompletedButton': '.todoApp-todoList-li__edit__modifyComplete',

                    'todoFooter': '.todo-footer',
                    'todoFilterButton': 'button[class*=todo-filter-button]',
                    'todoClearCompleteButton' : '.todo-clearCompleted-button'
                }
            };
            utility.uiEnhancements.call(dom);
            return dom;
        })();

        dom.element
            .off()
            .on('submit', function(e){
                e.preventDefault();
                var todo = new TodoModel({
                    id : new Date().getTime(),
                    text : dom.ui.todoCreate.val(),
                    isCompleted : false
                });
                dom.ui.todoCreate.val('');
                createTodo(todo);
            })
            .on('click', dom.ui.__uiString.todoListCheckbox, function(e) {
                var isChecked = $(e.currentTarget).prop("checked"),
                    todoId = $(e.currentTarget).data("id");
                toggleCompleted(todoId, isChecked);
            })
            .on('click', dom.ui.__uiString.todoListModifyButton, function(e) {
                e.preventDefault();
                showTodoTextArea(e);
            })
            .on('click', dom.ui.__uiString.todoListModifyCompletedButton, function(e) {
                e.preventDefault();
                var todoId = $(e.currentTarget).data("id"),
                    todo = todoCollection.findID(todoId),
                    $parentLi = $(e.currentTarget).closest(dom.ui.__uiString.todoListLi),
                    text = $parentLi.find(dom.ui.__uiString.todoListModifyInput).val();

                showTodoEditArea(e);
                editTodo(todo, text);
            })
            .on('click', dom.ui.__uiString.todoListDeleteButton, function(e) {
                e.preventDefault();
                var todoId = $(e.currentTarget).data("id");
                removeTodo(todoCollection.findID(todoId));
            })
            .on('click', dom.ui.__uiString.todoFilterButton, function(e) {
                e.preventDefault();
                var filterStateName = $(e.currentTarget).data('filterState');
                changeFilterState(filterStateName);
            })
            .on('click', dom.ui.__uiString.todoClearCompleteButton, function(e) {
                e.preventDefault();
                clearCompleted();
            });

        function showTodoTextArea(e){
            var $parentLi = $(e.currentTarget).closest(dom.ui.__uiString.todoListLi);
            $parentLi.find(dom.ui.__uiString.todoListTextArea).hide();
            $parentLi.find(dom.ui.__uiString.todoListEditArea).show();
        }

        function showTodoEditArea(e){
            var $parentLi = $(e.currentTarget).closest(dom.ui.__uiString.todoListLi)
            $parentLi.find(dom.ui.__uiString.todoListTextArea).show();
            $parentLi.find(dom.ui.__uiString.todoListEditArea).hide();
        }

        todoListView = new TodoListView({ element : dom.ui.todoList });
        todoFooterView = new TodoFooterView({ element : dom.ui.todoFooter });

        return {};
    };

    function createTodo(todo){
        todoCollection.add(todo);

        todoListView.add(todo.toJSON());
        todoFooterView.render(todoCollection, todoCommon);
    }

    function editTodo(todo, text){
        todo.set({ text : text });
        todoListView.render(todoCollection.toJSON());
        todoFooterView.render(todoCollection, todoCommon);
    }

    function removeTodo(todo){
        todoCollection.remove(todo);

        todoListView.render(todoCollection.toJSON());
        todoFooterView.render(todoCollection, todoCommon);
    }

    function toggleCompleted(todoId, isChecked){
        var todo = todoCollection.findID(todoId);
        todo.set({ isCompleted : isChecked });

        todoFooterView.render(todoCollection, todoCommon);
    }

    function clearCompleted(){
        todoCollection.clearCompleted();

        todoListView.render(todoCollection.toJSON());
        todoFooterView.render(todoCollection, todoCommon);
    }

    function changeFilterState(filterStateName){
        todoCommon.setFilter(filterStateName);
        var listViewObject;

        switch (filterStateName){
            case 'active':
                listViewObject = todoCollection.toJSON(todoCollection.remain());
                break;
            case 'completed':
                listViewObject = todoCollection.toJSON(todoCollection.completed());
                break;
            default:
                listViewObject = todoCollection.toJSON();
        }

        todoListView.render(listViewObject);
        todoFooterView.render(todoCollection, todoCommon);
    }

    return TodoApp;
});