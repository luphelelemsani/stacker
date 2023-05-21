import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/reduxHook';
import { logoutUser } from '../store/actions/auth-actions';
import { AppDispatch } from '../store';

const Navbar = () => {
  const dispatch:AppDispatch = useDispatch();
  const { user } = useAppSelector(state => state.authReducer);

  const handleClick = () => {
    dispatch(logoutUser());
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Stacker</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
