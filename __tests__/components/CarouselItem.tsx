import 'react-native';
import React from 'react';
import {CarouselItem} from '../../src/components/CarouselItem';
import {render} from '@testing-library/react-native';
describe('renders correctly', () => {
  const item = {
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
  };

  test('This Component contains header', async () => {
    const component = <CarouselItem item={item} />;
    const {findByText} = render(component);
    const carouselTitle = await findByText('Test Title');
    expect(carouselTitle).toBeTruthy();
  });
  test('This Component contains rate', async () => {
    const component = <CarouselItem item={item} />;
    const {findByText} = render(component);
    const carouselRate = await findByText('5');
    expect(carouselRate).toBeTruthy();
  });
});
