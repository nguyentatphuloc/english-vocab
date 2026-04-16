import { render, screen } from '@testing-library/react';
import App from './App';

test('renders english vocab header', () => {
  render(<App />);
  expect(screen.getByText(/English Vocab SRS/i)).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /Search/i }).length).toBeGreaterThan(0);
});
