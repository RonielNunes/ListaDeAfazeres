import React from "react";
import styled from "styled-components";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

//box-shadow: 0px 0px 5px #ccc;
const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; //
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead`
 
`;

export const Tbody = styled.tbody`
  font-size:14px;
`;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: center;
  border-bottom: inset;
  padding-bottom: 5px;
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  background-color: #e7e7e7;
  padding: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "center")};
  width: ${(props) => (props.width ? props.width : "auto")};
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const styleFaTrash = { color: "red", cursor: 'pointer'};
export const styleFaEdit = { color: "yellow", cursor: 'pointer'};


export default function Grid({tasks, setTasks,setOnEdit}) {
  // console.log('grid', tasks[0].id)

  //Função para deletar o registro ao clicar no icone
  const handleDelete = async (id) => {
    console.log('Excluido tarefas com o id: ', id)
    await axios.delete("http://localhost:8080/main/tasks/"+id)
    .then(({data}) =>{
      const newArray = tasks.filter((task) => task.id !== id); //remove o registro e pega o restante

      setTasks(newArray); //Atualiza o array de registros
      toast.success("Deletado com sucesso! ");
    }).catch(({data}) => toast.error("ERROR" + data));
    setOnEdit(null);
  };

  //Função para editar o registro ao clicar no icone
  const handleEdit = (item) =>{
    console.log('Atualizando a tarefa!')
    setOnEdit(item);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th id="title">Título</Th>
          <Th id='Description'>Descrição</Th>
          <Th id='DeadLie'>Prazo da Tarefa</Th>
        </Tr>
      </Thead>

        <Tbody>
          {tasks.map((item,i) => (
            <Tr key={i}>
              <Td width={"15%"}> {item.title} </Td>
              <Td width={"15%"}> {item.description} </Td>
              <Td width={"20%"}> {item.deadLine} </Td>
              <Td alignCenter width={"5%"}> <FaEdit style={styleFaEdit} onClick={() => handleEdit(item)} /> </Td>
              <Td alignCenter width={"5%"}> <FaTrash style={styleFaTrash} onClick={() => handleDelete(item.id)} /> </Td>
            </Tr>
          ))}
        </Tbody>

        
    </Table>
  );
}