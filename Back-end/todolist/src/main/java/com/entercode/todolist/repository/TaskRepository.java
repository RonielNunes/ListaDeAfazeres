package com.entercode.todolist.repository;

import com.entercode.todolist.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//Responsável por fazer a comunicação entre a Entidade Task(classe) com o bando de dados
@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

}
