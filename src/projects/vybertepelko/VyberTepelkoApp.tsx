import React, { useState } from 'react';
import { Wizard } from '../../shared/components/Wizard';
import { vybertepelkoWizard } from './data/vybertepelkoWizard';
import { Flame, Wind, CheckCircle, Clock, Shield, ArrowRight, Thermometer, Droplets, Leaf } from 'lucide-react';

const VyberTepelkoApp: React.FC = () => {
  const [showWizard, setShowWizard] = useState(false);

  if (showWizard) {
    return (
      <Wizard 
        steps={vybertepelkoWizard.steps} 
        settings={vybertepelkoWizard.settings}
        onBack={() => setShowWizard(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/5 to-amber-900/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="p-6 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full shadow-2xl">
                  <Wind className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Průvodce výběrem
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                tepelného čerpadla
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Získejte přesnou nabídku tepelného čerpadla na míru během několika minut. Náš interaktivní průvodce vám pomůže 
              definovat požadavky a najít ideální řešení pro váš domov.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => setShowWizard(true)}
                className="group inline-flex items-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl hover:from-orange-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
              >
                <Flame className="mr-3 h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
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
                <Clock className="h-5 w-5 text-amber-600" />
                <span>Jen 5 minut</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-gray-600" />
                <span>Bezpečné údaje</span>
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
              Ušetřete čas a získejte nabídku tepelného čerpadla přesně podle vašich potřeb
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rychlé vyplnění</h3>
              <p className="text-gray-600 leading-relaxed">
                Průvodce vás provede pouze 5 kroky a zabere maximálně 5 minut vašeho času
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Přesná nabídka</h3>
              <p className="text-gray-600 leading-relaxed">
                Na základě vašich odpovědí vytvoříme nabídku přesně na míru vašim potřebám
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-red-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Maximální úspora</h3>
              <p className="text-gray-600 leading-relaxed">
                Správný výběr tepelného čerpadla vám ušetří až 70% nákladů na vytápění
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Výhody tepelného čerpadla
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Moderní a úsporné řešení vytápění s řadou výhod
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-red-500 rounded-full mb-4 shadow-lg">
                <Thermometer className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Úspora nákladů</h3>
              <p className="text-gray-600">
                Snížení nákladů na vytápění až o 70% v porovnání s klasickými způsoby vytápění
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4 shadow-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ekologie</h3>
              <p className="text-gray-600">
                Minimální emise CO2 a využití obnovitelné energie pro vytápění vašeho domova
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4 shadow-lg">
                <Droplets className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Komfort vytápění</h3>
              <p className="text-gray-600">
                Bezobslužný provoz, konstantní teplota a možnost dálkového ovládání
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-700 to-amber-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Začněte šetřit za vytápění již tuto zimu
          </h2>
          <p className="text-xl lg:text-2xl text-orange-100 mb-10 leading-relaxed">
            Spusťte průvodce a získejte nezávaznou nabídku během několika minut
          </p>
          <button
            onClick={() => setShowWizard(true)}
            className="group inline-flex items-center px-12 py-6 text-xl font-bold text-orange-700 bg-white rounded-2xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
          >
            <Flame className="mr-3 h-6 w-6 group-hover:text-red-500 transition-colors duration-300" />
            Začít nyní
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VyberTepelkoApp;