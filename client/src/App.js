import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';

function App() {
  // Estado para los campos del formulario
  const [nombreTarea, setNombreTarea] = useState('');
  const [contexto, setContexto] = useState('');
  const [listaDatos, setListaDatos] = useState([]);

  const obtenerRegistros = () => {
    axios.get('http://localhost:3001/list')
    .then(response => {
      console.log(response)
      setListaDatos(response.data)
    })
    .catch(error => {
      console.error('Error al obtener toda la lista de tareas', error)
    })
  }

  useEffect(() => {
    obtenerRegistros()
  }, [0])

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaTarea = {
      nombre_tarea: nombreTarea,
      contexto: contexto,
      estatus: 0
    };

    // Enviar datos al servidor
    axios.post('http://localhost:3001/create', nuevaTarea)
      .then(response => {
        console.log('Tarea agregada:', response.data);
        obtenerRegistros()
      })
      .catch(error => {
        console.error('Error al agregar la tarea:', error);
      });
  };

  return (
    <div className="App container mt-4">
      <h1>Agregar Nueva Tarea</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de la Tarea</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingrese el nombre de la tarea" 
            value={nombreTarea} 
            onChange={(e) => setNombreTarea(e.target.value)} 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contexto</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingrese el contexto" 
            value={contexto} 
            onChange={(e) => setContexto(e.target.value)} 
          />
        </Form.Group>

        <Button variant="info" type="submit">
          Agregar Tarea
        </Button>
      </Form>
      <div className='container-fluid p-0 my-4'>
        <p>Lista de tareas</p>
        <Accordion defaultActiveKey='0'>
          {
            listaDatos.map((data, key) => {
              return(
                <Accordion.Item eventKey={key} key={key}>
                <Accordion.Header>{data.nombre_tarea}</Accordion.Header>
                <Accordion.Body>{data.contexto}</Accordion.Body>
              </Accordion.Item>
              )
            })
          }
        </Accordion>
      </div>
    </div>
  );
}

export default App;
