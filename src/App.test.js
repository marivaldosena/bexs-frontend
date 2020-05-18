import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders bexs logo', () => {
  const { getByTestId } = render(<App />);
  const linkElement = getByTestId('brand-logo');

  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent('Bexs');
});

test('renders sidebar menu', () => {
  const { container } = render(<App />);

  const menu = container.querySelector('nav .nav-wrapper a[data-target=slide-out]');
  expect(menu).toBeInTheDocument();

  const sideBar = container.querySelector('#slide-out');
  expect(sideBar).toBeInTheDocument();
});
