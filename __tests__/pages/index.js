import React from 'react';
import Home from '../../pages/index';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('HomePage tests', () => {
    it('should show a welcome message', () => {
        const { getByText } = render(<Home />);

        const isWelcomePresent = getByText('Welcome to the Battleship!');

        expect(isWelcomePresent).toBeTruthy();
    });
    it('should show a button to create a new game', () => {
        const { getByText } = render(<Home />);

        const isNewGamePresent = getByText('Create new game');

        expect(isNewGamePresent).toBeTruthy();
    });
});
