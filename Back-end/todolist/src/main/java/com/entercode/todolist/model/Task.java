package com.entercode.todolist.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Date;
 //Essa classe vai criar nossa tabela no banco
@Entity //é uma entidade no banco
@Table(name = "tasks") //nome da tabela
@Setter //Métodos modificadores e acessores
@Getter
@ToString

public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalDateTime deadLine;

//    @CreationTimestamp
//    @Column(name = "created_at", nullable = false, updatable = false)
//    private LocalDateTime created_at;
//
//    @UpdateTimestamp
//    @Column(name = "update_at")
//    private LocalDateTime updateAt;

}
