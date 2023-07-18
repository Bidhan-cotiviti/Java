//package com.todo.todo_list.controller;
//
//import com.todo.todo_list.repo.TodoListRepository;
//import com.todo.todo_list.model.TodoList;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/todo")
//public class TodoController{
//
//    @Autowired
//    private TodoListRepository todoRepo;
//
//    @GetMapping
//    public List<TodoList> findAll(){
//
//        return todoRepo.findAll();
//    }
//
//    @PostMapping
//    public TodoList save(@RequestBody TodoList todoList){
//        return todoRepo.save(todoList);
//    }
//
//}

package com.todo.todo_list.controller;

import com.todo.todo_list.model.TodoList;
import com.todo.todo_list.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<List<TodoList>> getAllTodoList() {
        return ResponseEntity.ok(todoService.getAllTodoList());
    }

    @PostMapping
    public ResponseEntity<TodoList> createTodo(@RequestBody TodoList todoList) {
        return ResponseEntity.ok(todoService.createTodo(todoList));
    }

    @PutMapping("todo/{id}")
    public ResponseEntity<TodoList> updateTodo(
            @PathVariable("id") String id,
            @RequestBody TodoList updatedTodo) {
        return ResponseEntity.ok(todoService.updateTodo(id, updatedTodo));
    }

    @DeleteMapping("todo/{id}")
    public ResponseEntity<Boolean> getAllTodo(@PathVariable("id") String id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok(true);
    }

}

