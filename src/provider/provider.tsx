import {gql, useQuery} from '@apollo/client';
import React, {createContext, useMemo, useState} from 'react';
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
type ContextType = {
  headerText: string;
  setHeaderText: React.Dispatch<React.SetStateAction<string>>;
  headerSelected: string;
  setHeaderSelected: React.Dispatch<React.SetStateAction<string>>;
  categoriesData: CategoryType[];
};
export const Context = createContext<ContextType>({
  headerText: '',
  headerSelected: '',
  categoriesData: [],
  setHeaderText: () => {},
  setHeaderSelected: () => {},
});
export const Provider = ({children}: any) => {
  const {data} = useQuery<CategoriesType | undefined>(CATEGORIES);
  const categoriesData = useMemo(() => {
    return data ? [{name: 'All'}, ...data.categoryCollection.items] : [];
  }, [data]);
  const [headerText, setHeaderText] = useState<string>('');
  const [headerSelected, setHeaderSelected] = useState<string>('All');
  return (
    <Context.Provider
      value={{
        headerText,
        setHeaderText,
        headerSelected,
        setHeaderSelected,
        categoriesData,
      }}>
      {children}
    </Context.Provider>
  );
};
