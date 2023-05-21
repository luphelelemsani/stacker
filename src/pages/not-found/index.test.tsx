import { render, screen } from '@testing-library/react';
import NotFoundPage from '.';

test('renders NotFoundPage component', () => {
  render(<NotFoundPage />);

  const headingElement = screen.getByRole('heading', { level: 1 });
  expect(headingElement).toHaveTextContent('404');

  const messageElement = screen.getByText('Page not found');
  expect(messageElement).toBeInTheDocument();
});
