import { Route, Redirect } from 'react-router';
import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import NavBar from '../NavBar/NavBar';

const Layout = ({ exact, path, component: Component }) => {
  const authCtx = useContext(AuthContext);

  return <Route
    exact={exact}
    path={path}
    render={() => {
      const userPages = <>
                <NavBar/>
                <main>
                  <Component />
                </main>
              </>;
      if(authCtx.currentUser) return userPages;
      return <Redirect to='/login'/>
    }}
  />;
}

export default Layout;