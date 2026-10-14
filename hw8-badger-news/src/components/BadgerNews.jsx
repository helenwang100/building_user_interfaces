import { NavigationContainer } from '@react-navigation/native';
import { useState, createContext } from 'react';
import BadgerTabs from './navigation/BadgerTabs';



export default function BadgerNews() {
  const [prefs, setPrefs] = useState({});
  const BadgerPreferencesContext = createContext([]);

  return (
    <BadgerPreferencesContext.Provider value={[prefs, setPrefs]}>
      <NavigationContainer>
        <BadgerTabs />
      </NavigationContainer>
    </BadgerPreferencesContext.Provider>
  );
}