import React from 'react';
import {render} from '@testing-library/react-native';
import NearbyItem from '../../src/components/NearbyItem';
describe('Testing LetsGo', () => {
  const data = {
    title: 'Test Title',
    rate: 5,
    category: {
      name: 'Category Name',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1640363256485-2a27d904adea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    },
    sys: {
      id: '123456789',
    },
    location: {
      lat: 49.1,
      lon: 101.1,
    },
  };
  test('This Component contains header', async () => {
    const component = <NearbyItem data={data} />;
    const {findByText} = render(component);
    const title = findByText(data.title);
    expect(title).toBeTruthy();
  });
});
