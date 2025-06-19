// src/pages/Login.js
import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => { //Función para manejar el login, el formulario
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/login', { //URL login-server
        method: 'POST', //POST en el backend login
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login Error');
      }

      const data = await response.json(); // <-- NECESARIO PARA ACCEDER A data.token
      localStorage.setItem('token', data.token);
      //Redirigir o actualizar estado de sesión aquí
      console.log('Login exitoso');

    } catch (err) {
      console.error('Error durante login:', err.message);
      alert('Credenciales incorrectas');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h3>Iniciar sesión</h3>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-3" type="submit" variant="primary">Entrar</Button>
      </Form>
    </Container>
  );
}