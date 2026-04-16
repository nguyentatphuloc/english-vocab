import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders english vocab header', () => {
  render(<App />);
  expect(screen.getByText(/English Vocab SRS/i)).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /Search/i }).length).toBeGreaterThan(0);
});

test('clears toast timeout on unmount', async () => {
  jest.useFakeTimers();
  const fetchSpy = jest.spyOn(global, 'fetch').mockRejectedValue(new Error('network'));
  const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');

  const { unmount } = render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/Type an English word/i), { target: { value: 'hello' } });
  fireEvent.click(screen.getAllByRole('button', { name: 'Search' })[1]);

  await waitFor(() => {
    expect(screen.getByText('Word not found.')).toBeInTheDocument();
  });

  unmount();
  expect(clearTimeoutSpy).toHaveBeenCalled();

  fetchSpy.mockRestore();
  clearTimeoutSpy.mockRestore();
  jest.useRealTimers();
});
