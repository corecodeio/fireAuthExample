import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NavBar = (props) =>  {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const handleLogOut = async () => {
    try {
      await authCtx.logout();
      history.push('/login');
    } catch(e) {
      console.log(`Error: ${e}`);
    }
  }

  return <div>
      <Button variant="danger" onClick={handleLogOut}>LogOut {authCtx.currentUser.email}</Button>
    </div>
};


export default NavBar;