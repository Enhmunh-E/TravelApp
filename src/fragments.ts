import {gql} from '@apollo/client';

export const ACTIVITY_PLACE_FIELDS = gql`
  fragment ActivityPlaceFields on Activity {
    title
    rate
    category {
      name
    }
    image {
      url
    }
    sys {
      id
    }
  }
`;
