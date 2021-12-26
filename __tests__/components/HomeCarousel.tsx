import 'react-native';
import React from 'react';
import HomeCarousel from '../../src/components/HomeCarousel';
import {render} from '@testing-library/react-native';
type SingleDataType = {
  title: string;
  rate: number;
  category: {
    name: string;
  };
  image: {
    url: string;
  };
  sys: {
    id: string;
  };
};
type DataType = SingleDataType[];
const makeid = (length: number) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
describe('renders correctly', () => {
  const data: DataType = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      title: 'Test Title',
      rate: 5,
      category: {
        name: 'Category Name',
      },
      image: {
        url: 'https://images.unsplash.com/photo-1640363256485-2a27d904adea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
      },
      sys: {
        id: makeid(9),
      },
    });
  }
  test('This Component has equal size of data rendered', async () => {
    const component = <HomeCarousel data={data} loading={false} />;
    const {getAllByTestId} = render(component);
    const carouselItem = await getAllByTestId('carouselItemId');
    expect(carouselItem.length).toBe(10);
  });
});
