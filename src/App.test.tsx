import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders weather app header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Weather App/i);
  expect(headerElement).toBeTruthy();
});