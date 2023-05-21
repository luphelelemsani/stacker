import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import {store} from '../../store'; // Your Redux store
import Navbar from '.';
import { BrowserRouter } from 'react-router-dom';

test('renders Navbar component', () => {
  render(
    <Provider store={store}>
    <BrowserRouter basename="/">
        <Navbar />
    </BrowserRouter>
    </Provider>
  );
});
