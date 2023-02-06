# ListaDeAfazeres
https://www.youtube.com/watch?v=HIQtj5alGnE&list=PL_pqVN-1MnwMScqW3AnPR0oA2SiBy0d2_&index=6
Tecnologias utilizadas:

Java 11
Spring
H2 Database
Swagger (Springfox)
Heroku
Postresql

## **Back-end**

### **Configuração do Spring boot**
- Project: Maven
- Language: Java
- Spring Boot: 3.0.2
- Project Metadata
    - Group: com.entercode
    - Artitact: todolist
    - Name: Todolist
    - Description: Lista de afazeres
    - Package name: com.entercode.todolist
    - Packaging: Jar
    - Java: 17
- Dependencies: 
	- H2 Database SQL: Provides a fast in-memory database that supports JDBC API and R2DBC access, with a small (2mb) footprint. Supports embedded and server modes as well as a browser based console application.
	- Spring Data JPA SQL: Persist data in SQL stores with Java Persistence API using Spring Data and Hibernate.
	- Spring Web WEB: Build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container.
	- Lombok DEVELOPER TOOLS: Java annotation library which helps to reduce boilerplate code.

### **Configuração MVC**

- controller
	- TaskController class
- model
	- Task class
- repository
	- TaskRepository interface
- service
	- TaskService class

### **Configurando application.properties**

`
#http://localhost:8080/h2-console
#https://www.baeldung.com/spring-boot-h2-database

# http://localhost:8080/h2-console
# https://www.baeldung.com/spring-boot-h2-database
spring.h2.console.path=/h2-console
spring.jpa.defer-datasource-initialization=true
spring.h2.console.enabled=true

spring.datasource.url=jdbc:h2:mem:todolist
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
`
Application expõe um dicionário por meio Properties do qual você pode usar para armazenar propriedades de escopo do aplicativo.

### **Criando a Entidade Task: gera a tabela no banco de dados**

`
package com.entercode.todolist.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
    private Date deadLine;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date created_at;

    @UpdateTimestamp
    @Column(name = "update_at")
    private Date updateAt;

}

`Java


### **Rodando e testando o serve do banco**

- http://localhost:8080/h2-console/
	- URL e senha definidos no properties

### **Criando métodos de crianção de Task e testando comunição com o banco utilizando o postman**

- Primeiro criar o método na Service
- Segundo método na Controller

 - Faz o teste no postman para ver se funciona corretamente a comunicação.
- Get: busca
- Post: Insere
- Put: Atualiza
- Delete: Deleta

### **Documentação**
https://www.baeldung.com/swagger-2-documentation-for-spring-rest-api
- Dependencias:
pom.xml
`
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>3.0.0</version>
</dependency>

`

- Criar nova pasta para a docs e a Classe SwaggerConfiguration.

`
package com.entercode.todolist.docs;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
    @Bean
    public Docket api(){
        return new Docket(
                DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.entercode.todolist.controller"))
                .paths(PathSelectors.any())
                .build()
                .useDefaultResponseMessages(true)
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title("To do List")
                .description(" Lista de Afazeres")
                .version("1.0.0")
                .build();
    }
}

`

- http://localhost:8080/swagger-ui/index.html

- Anotações de endpoints


### **Postgresql e Heroku**


`
		<dependency>
			<groupId>org.postgresql</groupId>
			<artifactId>postgresql</artifactId>
		</dependency>
`

- properties

`
spring.datasource.url=${JDBC_DATASOURCE_URL}
spring.jpa.show-sql=true
spring.jpa.generate-ddl=true
server.port=${PORT:8080}

spring.datasource.driverClassName=org.postgresql.Driver
spring.datasource.maxActive=10
spring.datasource.maxIdle=5
spring.datasource.minIdle=2
spring.datasource.iniialSize=5
spring.datasource.removeAbandoned=true
`

- system.properties criada

`
java.runtime.version=11
`

- https://devcenter.heroku.com/articles/heroku-cli




- Informações aprendidas: 

arquivo **pom.xml**.O arquivo pom.xml é considerado o coração de um projeto Maven. 
Com a configuração de poucos descritores é possível gerenciar dependências, centralizar documentação 
sobre o projeto e principalmente compilar e distribuir uma aplicação.

