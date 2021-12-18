import {gql, OperationVariables, useLazyQuery, useQuery} from '@apollo/client';
import React, {createContext, useMemo, useState} from 'react';
import {ACTIVITY_PLACE_FIELDS} from '../fragments';
type CategoryType = {
  name: string;
};

type CategoriesType = {
  categoryCollection: {
    items: CategoryType[];
  };
};

const CATEGORIES = gql`
  query {
    categoryCollection {
      items {
        name
      }
    }
  }
`;
type ActivityType = {
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
const FILTERED_ACTIVITY = gql`
  ${ACTIVITY_PLACE_FIELDS}
  query FilteredAcivity($categoryName: String) {
    activityCollection(where: {category: {name: $categoryName}}) {
      items {
        ...ActivityPlaceFields
      }
    }
  }
`;
type ActivitiesType = {
  activityCollection: {
    items: ActivityType[];
  };
};

type ContextType = {
  headerText: string;
  setHeaderText: React.Dispatch<React.SetStateAction<string>>;
  headerSelected: string;
  filteredLoading: boolean;
  filteredData: ActivitiesType | undefined;
  setHeaderSelected: React.Dispatch<React.SetStateAction<string>>;
  categoriesData: CategoryType[];
  loadFilteredActivity: () => void;
};
export const Context = createContext<ContextType>({
  headerText: '',
  headerSelected: '',
  categoriesData: [],
  filteredLoading: true,
  filteredData: {
    activityCollection: {
      items: [],
    },
  },
  setHeaderText: () => {},
  setHeaderSelected: () => {},
  loadFilteredActivity: () => {},
});
export const Provider = ({children}: any) => {
  const {data} = useQuery<CategoriesType | undefined>(CATEGORIES);
  const [headerText, setHeaderText] = useState<string>('');
  const [headerSelected, setHeaderSelected] = useState<string>('All');
  const categoriesData = useMemo(() => {
    return data ? [{name: 'All'}, ...data.categoryCollection.items] : [];
  }, [data]);
  const [loadFilteredActivity, {loading: filteredLoading, data: filteredData}] =
    useLazyQuery<ActivitiesType>(FILTERED_ACTIVITY, {
      variables: {categoryName: headerSelected},
    });
  return (
    <Context.Provider
      value={{
        filteredData,
        loadFilteredActivity,
        headerText,
        setHeaderText,
        headerSelected,
        setHeaderSelected,
        categoriesData,
        filteredLoading,
      }}>
      {children}
    </Context.Provider>
  );
};
