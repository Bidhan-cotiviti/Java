package com.todo.todo_list.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "todo")
public class TodoList {

    @Id
    @Column(name = "emp_id")
    private String emp_id;
    @Column(name = "name")
    private String name;
    @Column(name = "position")
    private String position;
    @Column(name = "date")
    private String date;
    @Column(name = "remarks")
    private String remarks;


    public TodoList() {
    }

    public TodoList(String emp_id, String name, String position, String date, String remarks) {
        this.emp_id = emp_id;
        this.name = name;
        this.position = position;
        this.date = date;
        this.remarks = remarks;
    }


    public String getEmp_id() {
        return emp_id;
    }

    public void setEmp_id(String emp_id) {
        this.emp_id = emp_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    @Override
    public String toString() {
        return "Todo [id=" + emp_id + ", name=" + name + ", position=" + position + ", date=" + date + ", remarks=" + remarks + " ]";
    }

}
