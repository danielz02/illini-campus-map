import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {test} from "pretty-format";

test('renders learn react link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Campus Map/i);
});
