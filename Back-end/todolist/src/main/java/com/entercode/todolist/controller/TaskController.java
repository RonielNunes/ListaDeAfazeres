package com.entercode.todolist.controller;

import com.entercode.todolist.model.Task;
import com.entercode.todolist.service.TaskService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// localhost:8080/main/tasks postman
@RestController
@RequestMapping("/main")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    //Controller - Service - repository - camada de dados e aí comunica com o banco

    TaskService taskService;

    @PostMapping("/tasks")
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(@RequestBody Task task){
        log.info("Criando uma nova tarefa com as informações [{}].", task);
        return taskService.createTask(task);
    }

    @GetMapping("/tasks")
    @ResponseStatus(HttpStatus.OK)
    public List<Task> getAllTasks(){
        log.info("Listando todas as tarefas cadastradas");
        return taskService.listAllTask();
    }

    @GetMapping("/tasks/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Task> getTaskById(@PathVariable (value = "id") Long id){
        log.info("Buscando tarefa por id[{}].", id);
        return taskService.findTaskById(id); //Função que criei na taskService
    }

    @PutMapping("/tasks/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Task> updateTaskById(@PathVariable (value = "id") Long id,@RequestBody Task task){
        log.info("Atualizando a tarefa com id[{}] as novas informações [{}].", id, task);
        return taskService.updateTaskById(task, id); //Função que criei na taskService
    }
    //End point
    @DeleteMapping("/tasks/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> DeleteTaskById(@PathVariable (value = "id") Long id){
        log.info("Excluido tarefas com o id[{}].", id);
        return taskService.deleteById(id); //Função que criei na taskService
    }
}
