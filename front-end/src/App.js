
import GlobalStyle from "./styles/global"; //Estilização Global
import { toast, ToastContainer } from "react-toastify"; //Notificação de ação
import "react-toastify/dist/ReactToastify.css"; //Estilização da toastify
import Container from "./styles/container"; //Container
import Title from "./styles/title";
import Form from "./components/Form";
import Grid  from "./components/Grid";
import { useEffect, useState} from "react";
import axios from "axios";

/*
styled-components :  npm i styled-components     https://www.npmjs.com/package/styled-components
axios :              npm i axios                 https://www.npmjs.com/package/axios
react-icons :        npm i react-icons           https://www.npmjs.com/package/react-icons
react-toastify :     npm i react-toastify        https://www.npmjs.com/package/react-toastify

  creat - id, tile, data
  read - for id or all
  update - id
  delete - id

*/
function App() {
  const [tasks, setTasks] = useState([]); //insere em tasks ao receber do banco
  const [onEdit, setOnEdit] = useState(null);

  //Recebendo de forma async do bando as tarefas já feitas.
  const getTasks = async () => {
    try{
      const response = await axios.get("http://localhost:8080/main/tasks");
      // console.log('teste 2',response.data)
      setTasks(response.data.sort((a,b) => (a.title > b.title ? 1: -1)));
    }catch(error){
      // console.log(error); 
      toast.error(error);
    }
  }
  
  useEffect(() => {
    getTasks();
  }, [setTasks]); //recarregar sempre que setar uma nova tarefa

  // console.log('teste',tasks) 

  return (
    <>
      <Container>
        <Title>LISTA DE AFAZERES</Title>
        <br/>
      </Container>

      <Form onEdit={onEdit} setOnEdit={setOnEdit} getTasks={getTasks} />

      <Grid tasks={tasks} setTasks={setTasks} setOnEdit={setOnEdit} />

      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      
      <GlobalStyle />
    </>
  );

}

export default App;
