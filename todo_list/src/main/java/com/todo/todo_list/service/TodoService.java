package com.todo.todo_list.service;

import com.todo.todo_list.model.TodoList;
import com.todo.todo_list.repo.TodoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoListRepository todoListRepository;

    public TodoList createTodo(TodoList todoList){
        return todoListRepository.save(todoList);
    }

    public List<TodoList> getAllTodoList() {
        return todoListRepository.findAll();
    }

    public TodoList updateTodo(String id, TodoList updatedTodo) {
        Optional<TodoList> optionalTodo = todoListRepository.findById(id);
        if (optionalTodo.isPresent()) {
            TodoList todo = optionalTodo.get();
            todo.setName(updatedTodo.getName());
            todo.setPosition(updatedTodo.getPosition());
            todo.setDate(updatedTodo.getDate());
            todo.setRemarks(updatedTodo.getRemarks());

            return todoListRepository.save(todo);
        } else {
            throw new IllegalArgumentException("Todo not found with empId: " + id);
        }

    }


    public void deleteTodo(String id) {
        Optional<TodoList> optionalTodo = todoListRepository.findById(id);
        if (optionalTodo.isPresent()) {
            todoListRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Todo not found with empId: " + id);
        }
    }

}
