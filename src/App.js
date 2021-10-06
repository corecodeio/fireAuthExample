import { Switch, Route } from 'react-router';
import { Container } from 'react-bootstrap';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard  from './components/Dashboard/Dashboard';
import AuthProvider from './context/AuthProvider';
import About from './components/About/About';
import Layout from './components/Layout/Layout';

const App = () => {
  return (<>
    <AuthProvider>
      <Container fluid className="ps-0 pe-0">
        <Switch>
          <Layout exact path ='/' component={Dashboard}/> 
          <Layout exact path ='/about' component={About}/>
          <Route path ='/register' component={Register}/>
          <Route path ='/login' component={Login}/>
        </Switch>
      </Container>
    </AuthProvider>
  </>);
}

export default App;
