import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import AuthContext from '../../context/auth-context';

const Login = () => {
  const authCtx = useContext(AuthContext); 
  const [error, setError] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);
  const email = useRef();
  const password = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setDisableSubmit(true);
      await authCtx.login(email.current.value, password.current.value);
      history.push('/');
    } catch {
      setError('Ocurrio un error, no se puede iniciar sesion');
    }
    setDisableSubmit(false);
  }

  return (<>
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{maxWidth: "400px"}}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={email} required/>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={password} required/>
                </Form.Group>
                <Button 
                  disabled={disableSubmit}
                  className="w-100 mt-3" 
                  type="submit">Log In</Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need and account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
  </>);
}

export default Login;