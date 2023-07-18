package com.todo.todo_list.repo;

import com.todo.todo_list.model.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoListRepository extends JpaRepository<TodoList, String > {
//   List<TodoList> findAll();
}

