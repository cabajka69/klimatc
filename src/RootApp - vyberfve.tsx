import React from 'react';
import VyberFveApp from './projects/vyberfve/VyberFveApp';
// Importy pro ostatní průvodce (VyberKlimuApp, VyberTepelkoApp) jsou v této verzi zakomentovány,
// protože nejsou potřeba, když se renderuje pouze VyberFveApp.

/**
 * RootApp - Hlavní komponenta aplikace
 * 
 * TATO VERZE JE UPRAVENA TAK, ABY PŘÍMO ZOBRAZOVALA POUZE FVE PRŮVODCE.
 */
const RootApp: React.FC = () => {
  // V této verzi RootApp přímo renderuje VyberFveApp.
  // Veškerá logika pro přepínání průvodců, čtení URL parametrů nebo zobrazení menu
  // je pro tento specifický účel buildu odstraněna/ignorována.
  return <VyberFveApp />;
};

export default RootApp;

