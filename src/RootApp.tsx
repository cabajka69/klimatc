import React, { useState, useEffect } from 'react';
import VyberFveApp from './projects/vyberfve/VyberFveApp';
import VyberKlimuApp from './projects/vyberklimu/VyberKlimuApp';
import VyberTepelkoApp from './projects/vybertepelko/VyberTepelkoApp';

/**
 * RootApp - Hlavní komponenta aplikace
 * Slouží jako "router", který na základě URL parametru "wizard" nebo interního stavu
 * zobrazuje příslušný průvodce nebo hlavní menu
 */
const RootApp: React.FC = () => {
  // Stav aplikace - který průvodce je aktuálně zobrazen
  const [activeWizard, setActiveWizard] = useState<string | null>(null);

  // Při načtení komponenty zkontrolovat URL parametry
  useEffect(() => {
    // Získání parametru "wizard" z URL adresy
    const urlParams = new URLSearchParams(window.location.search);
    const wizardParam = urlParams.get('wizard');
    
    // Pokud je v URL parametr "wizard", nastavit příslušný průvodce
    if (wizardParam) {
      setActiveWizard(wizardParam);
    }
  }, []);

  // Funkce pro změnu aktivního průvodce (používá se v menu)
  const changeWizard = (wizardId: string) => {
    // Změna parametru v URL bez přenačtení stránky
    const url = new URL(window.location.href);
    url.searchParams.set('wizard', wizardId);
    window.history.pushState({}, '', url);
    
    // Nastavení aktivního průvodce
    setActiveWizard(wizardId);
  };

  // Funkce pro návrat na hlavní menu
  const goToMenu = () => {
    // Odstranění parametru z URL
    const url = new URL(window.location.href);
    url.searchParams.delete('wizard');
    window.history.pushState({}, '', url);
    
    // Nastavení aktivního průvodce na null (zobrazí se menu)
    setActiveWizard(null);
  };

  // Zobrazení konkrétního průvodce podle aktivního stavu
  if (activeWizard === 'vyberfve') {
    return <VyberFveApp />;
  }
  
  if (activeWizard === 'vyberklimu') {
    return <VyberKlimuApp />;
  }
  
  if (activeWizard === 'vybertepelko') {
    return <VyberTepelkoApp />;
  }

  // Pokud není vybrán žádný průvodce, zobrazí se hlavní menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Průvodci výběrem</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vyberte si jednoho z našich interaktivních průvodců pro výběr řešení na míru vašim potřebám
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FVE Průvodce */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <div className="h-40 bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Průvodce výběrem fotovoltaiky</h2>
              <p className="text-gray-600 mb-6">Najděte ideální fotovoltaický systém pro váš domov nebo firmu. Snižte účty za elektřinu až o 90%.</p>
              <button 
                onClick={() => changeWizard('vyberfve')} 
                className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 transition-colors"
              >
                Spustit průvodce
              </button>
            </div>
          </div>

          {/* Klimatizace Průvodce */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <div className="h-40 bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Průvodce výběrem klimatizace</h2>
              <p className="text-gray-600 mb-6">Vyberte vhodnou klimatizaci pro váš domov nebo kancelář. Zajistěte si komfort během celého roku.</p>
              <button 
                onClick={() => changeWizard('vyberklimu')} 
                className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 transition-colors"
              >
                Spustit průvodce
              </button>
            </div>
          </div>

          {/* Tepelné čerpadlo Průvodce */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
            <div className="h-40 bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Průvodce výběrem tepelného čerpadla</h2>
              <p className="text-gray-600 mb-6">Ušetřete až 70% nákladů na vytápění díky modernímu tepelnému čerpadlu vybranému na míru.</p>
              <button 
                onClick={() => changeWizard('vybertepelko')} 
                className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 transition-colors"
              >
                Spustit průvodce
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootApp;