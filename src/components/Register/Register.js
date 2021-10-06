import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import AuthContext from '../../context/auth-context';

const Register = () => {
  const authCtx = useContext(AuthContext); 
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [error, setError] = useState('');
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password.current.value !== passwordConfirm.current.value) return setError('El password no hace match');
    try {
      setError('');
      setDisableSubmit(true);
      await authCtx.register(email.current.value, password.current.value);
      history.push('/');
    } catch {
      setError('Ocurrio un error, no se puede registrar el usuario');
    }
    setDisableSubmit(false);
  }


  return (<>
    <div className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      <div className="w-100" style={{maxWidth: "400px"}}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Register</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={email} required/>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={password} required/>
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirm</Form.Label>
                <Form.Control type="password" ref={passwordConfirm} required/>
              </Form.Group>
              <Button 
                disabled={disableSubmit}
                className="w-100 mt-3" 
                type="submit">Register</Button>
            </Form>
            { error && <Alert>{error}</Alert> }
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already a user? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  </>);
}

export default Register
