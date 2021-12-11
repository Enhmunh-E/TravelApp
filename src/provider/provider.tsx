import React, {createContext, useState, useRef} from 'react';
import {Animated} from 'react-native';
type ContextType = {
  headerText: string;
  setHeaderText: React.Dispatch<React.SetStateAction<string>>;
  headerSelected: string;
  setHeaderSelected: React.Dispatch<React.SetStateAction<string>>;
};
export const Context = createContext<ContextType>({
  headerText: '',
  headerSelected: '',
  setHeaderText: () => {},
  setHeaderSelected: () => {},
});
export const Provider = ({children}: any) => {
  const [headerText, setHeaderText] = useState<string>('');
  const [headerSelected, setHeaderSelected] = useState<string>('All');
  return (
    <Context.Provider
      value={{headerText, setHeaderText, headerSelected, setHeaderSelected}}>
      {children}
    </Context.Provider>
  );
};
