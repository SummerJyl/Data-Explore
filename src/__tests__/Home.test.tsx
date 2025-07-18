import { render, screen } from '@testing-library/react';
import Home from '../pages/Home'; // adjust the import path as needed

test('renders header and supplement data', () => {
  render(<Home />);

  // Check for header title
  expect(screen.getByText(/Bio Health Data Explorer/i)).toBeInTheDocument();

  // Check for some supplement names
  expect(screen.getByText(/Vitamin D/i)).toBeInTheDocument();
  expect(screen.getByText(/Omega-3/i)).toBeInTheDocument();
  expect(screen.getByText(/Probiotic/i)).toBeInTheDocument();
});
