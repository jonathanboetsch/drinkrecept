import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloWorld from './HelloWorld';

test('renders HelloWorld component', () => {
    render(<HelloWorld />);
    const linkElement = screen.getByText(/Hello, World!/i);
    expect(linkElement).toBeInTheDocument();
});