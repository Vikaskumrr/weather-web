import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Weather App/i);
  expect(headerElement).toBeTruthy();
});