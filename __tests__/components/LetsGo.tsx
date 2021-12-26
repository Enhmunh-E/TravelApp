import React from 'react';
import LetsGo from '../../src/components/LetsGo';
import {render} from '@testing-library/react-native';
describe('Testing LetsGo', () => {
  test('This Component contains header', async () => {
    const component = <LetsGo isdark={true} />;
    const {findByText} = render(component);
    const header = await findByText(/LET'S GO!/);
    expect(header).toBeTruthy();
  });
  test('This Component contains 3 lines', async () => {
    const component = <LetsGo isdark={true} />;
    const {findAllByTestId} = render(component);
    const lines = await findAllByTestId('line');
    expect(lines.length).toBe(3);
  });
});
