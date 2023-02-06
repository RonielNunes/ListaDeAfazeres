import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 200px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

//getUsers = getTask


export default function Form({onEdit, setOnEdit, getTasks}) {
  const referenciaOFormulario = useRef();

  //Função que referencia o formulário e é usada para edição do registro
  useEffect(() => {
    if(onEdit){
      const task = referenciaOFormulario.current;

      task.title.value = onEdit.title;
      task.description.value = onEdit.description;
      task.deadLine.value = onEdit.deadLine;
    }
  }, [onEdit]);


  const handleSubmit = async (e) => {
    e.preventDefault(); //Para não recarregar a página.

    const task = referenciaOFormulario.current;
    
    if( !task.title.value || !task.description.value || !task.deadLine.value ){
      return toast.warn("Preencha todos os campos!") //pop-up para preencer todos os campos.
    }

    console.log('valor onEdit: ', onEdit)
    if(onEdit){
      console.log('Atualizando a tarefa com id {} as novas informações {}.', onEdit.id, onEdit)
      //editar um id
      await axios.put("http://localhost:8080/main/tasks/" + onEdit.id, {
      title: task.title.value,
      description: task.description.value,
      deadLine: task.deadLine.value,
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));
    }else{

      console.log('Inserindo ' , task.title.value,task.description.value,task.deadLine.value)
      await axios.post("http://localhost:8080/main/tasks", {
      title: task.title.value,
      description: task.description.value,
      deadLine: task.deadLine.value,
      })
      .then(({ data }) => toast.success("Tarefa salva!"))
      .catch(({ data }) => toast.error(data));
    }

    task.title.value = "";
    task.description.value = "";
    task.deadLine.value = "";
    setOnEdit(null); //Inclusão sem conflito.
    getTasks();
  };

  return (
    <FormContainer ref={referenciaOFormulario} onSubmit={handleSubmit}>

      <InputArea>
        <Label>Título</Label>
        <Input name="title"/>
      </InputArea>

      <InputArea>
        <Label>Descrição</Label>
        <Input name="description"/>
      </InputArea>

      <InputArea>
        <Label>Data</Label>
        <Input name="deadLine" type="datetime-local"/>
      </InputArea>

      <Button type="submit"> SALVAR</Button>
    </FormContainer>
  )
}