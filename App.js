import React from 'react';
import Navigation from './navigacion/navigacion';  // Importa tu navegación
import { DarkModeProvider } from './DarkModeContext';  // Asegúrate de que la ruta sea correcta

export default function App() {
  return (
    // Envuelve la aplicación con el DarkModeProvider para que esté disponible en todas las pantallas
    <DarkModeProvider>
      <Navigation />
    </DarkModeProvider>
  );
}
