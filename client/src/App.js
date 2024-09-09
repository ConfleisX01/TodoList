import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';

function App() {
  // Estado para los campos del formulario
  const [nombreTarea, setNombreTarea] = useState('');
  const [contexto, setContexto] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaTarea = {
      nombre_tarea: nombreTarea,
      contexto: contexto,
      estatus: 1
    };

    // Enviar datos al servidor
    axios.post('http://localhost:3001/create', nuevaTarea)
      .then(response => {
        console.log('Tarea agregada:', response.data);
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
    </div>
  );
}

export default App;
