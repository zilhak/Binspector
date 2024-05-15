import { render, screen } from '@testing-library/react';
import Binspector from './Binspector';

test('renders learn react link', () => {
  render(<Binspector />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
