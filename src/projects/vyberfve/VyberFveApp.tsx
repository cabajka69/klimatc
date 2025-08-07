import React, { useState } from 'react';
import { Wizard } from '../../shared/components/Wizard';
import { vyberfveWizard } from './data/vyberfveWizard';
import { Zap, CheckCircle, Clock, Shield, ArrowRight, Sun, Battery, Leaf, Settings } from 'lucide-react';

const VyberFveApp: React.FC = () => {
  const [showWizard, setShowWizard] = useState(false);

  if (showWizard) {
    return (
      <Wizard 
        steps={vyberfveWizard.steps} 
        settings={vyberfveWizard.settings}
        onBack={() => setShowWizard(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/5 to-gray-900/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="p-6 bg-gradient-to-r from-slate-700 to-gray-700 rounded-full shadow-2xl">
                  <Zap className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Průvodce výběrem
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-gray-700">
                fotovoltaiky
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Ujasněte si, co od fotovoltaiky čekáte a získejte konkrétní zadání pro svého dodavatele.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => setShowWizard(true)}
                className="group inline-flex items-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-slate-700 to-gray-700 rounded-2xl hover:from-slate-800 hover:to-gray-800 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
              >
                <Sun className="mr-3 h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
                Spustit průvodce
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Zdarma a nezávazně</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-slate-600" />
                <span>Jen 10 minut</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-gray-600" />
                <span>PDF výstup</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Proč použít náš průvodce?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Získejte ucelený a srozumitelný přehled o tom, jak by mohla vypadat Vaše budoucí fotovoltaika. Tento návrh můžete jednoduše předat Vámi vybranému dodavateli jako konkrétní zadání pro vytvoření cenové nabídky přesně podle Vašich potřeb a možností Vaší nemovitosti.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-slate-600 to-gray-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rychlé vyplnění</h3>
              <p className="text-gray-600 leading-relaxed">
                Jen 9 kroků a máte jasno, kam se s fotovoltaikou vydat
                {/* Průvodce vás provede jen 9 kroky a zabere maximálně 10 minut vašeho času */}
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Přesná nabídka</h3>
              <p className="text-gray-600 leading-relaxed">
                Návrh přesně podle vaší nemovitosti, spotřeby i představ
                {/* Na základě vašich odpovědí vytvoříme nabídku přesně na míru vašim potřebám */}
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">PDF výstup</h3>
              <p className="text-gray-600 leading-relaxed">
                Výstup slouží jako ideální podklad pro jednání s dodavatelem
                {/* Vaše data jsou v bezpečí a používáme je pouze pro vytvoření nabídky */}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Výhody fotovoltaiky
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Úspory, investice, energetická nezávislost i dobrý pocit.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mb-4 shadow-lg">
                <Sun className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Úspora nákladů</h3>
              <p className="text-gray-600">
                Snižte účty za elektřinu až o 80% a chraňte se před růstem cen energií
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4 shadow-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ekologie</h3>
              <p className="text-gray-600">
                Přispějte k ochraně životního prostředí a snižte svou uhlíkovou stopu
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-slate-500 to-gray-500 rounded-full mb-4 shadow-lg">
                <Battery className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nezávislost</h3>
              <p className="text-gray-600">
                Získejte energetickou nezávislost a kontrolu nad svými náklady
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-slate-700 to-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Zvažujete fotovoltaiku? Udělejte si jasno
          </h2>
          <p className="text-xl lg:text-2xl text-slate-100 mb-10 leading-relaxed">
            Spusťte průvodce a získejte přehled, dřív než oslovíte dodavatele
          </p>
          <button
            onClick={() => setShowWizard(true)}
            className="group inline-flex items-center px-12 py-6 text-xl font-bold text-slate-700 bg-white rounded-2xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
          >
            <Zap className="mr-3 h-6 w-6 group-hover:text-amber-500 transition-colors duration-300" />
            Začít nyní
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VyberFveApp;