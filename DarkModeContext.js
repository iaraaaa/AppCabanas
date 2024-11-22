import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

// Crear el contexto
export const DarkModeContext = createContext();

// Crear el proveedor del contexto
export const DarkModeProvider = ({ children }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Detectar el modo oscuro del sistema
  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setDarkModeEnabled(colorScheme === 'dark');
  }, []);

  // Alternar el modo oscuro
  const toggleDarkMode = () => {
    setDarkModeEnabled((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkModeEnabled, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
