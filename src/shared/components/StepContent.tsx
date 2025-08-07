import React from 'react';
import { WizardStep, FormData, ValidationError } from '../types/wizard';
import { FormField } from './FormField';
import { getFieldDisplayValue, evaluateConditional } from '../utils/utility';
import * as Icons from 'lucide-react';

interface StepContentProps {
  step: WizardStep;
  formData: FormData;
  onFieldChange: (fieldId: string, value: any) => void;
  errors: ValidationError[];
  device?: 'desktop' | 'tablet' | 'mobile';
}

export const StepContent: React.FC<StepContentProps> = ({
  step,
  formData,
  onFieldChange,
  errors,
  device = 'desktop'
}) => {
  // Debug logging pro ladění podmíněných polí
  React.useEffect(() => {
    if (step.id === 'appliances') {
      console.log('=== DEBUG: Appliances Step ===');
      console.log('Current formData:', formData);
      console.log('Property type:', formData.propertyType);
      console.log('Current appliances:', formData.currentAppliances);
      console.log('Future appliances:', formData.futureAppliances);
      console.log('Air conditioning building units:', formData.airConditioningBuildingUnits);
      
      // Test podmínek pro klíčová pole
      const testFields = [
        'airConditioningBuildingUnits',
        'acInstallationType', 
        'commercialUnitsCount',
        'futureAirConditioningApartmentDetails'
      ];
      
      testFields.forEach(fieldId => {
        const field = step.fields.find(f => f.id === fieldId);
        if (field) {
          const shouldShow = field.conditional ? evaluateConditional(field.conditional, formData) : true;
          console.log(`Field "${fieldId}" should show:`, shouldShow);
          if (field.conditional) {
            console.log(`  - Conditional:`, field.conditional);
          }
        }
      });
      
      console.log('=== END DEBUG ===');
    }
  }, [step.id, formData, step.fields]);

  // Určuje, zda by mělo být pole zobrazeno na základě podmínek
  const shouldShowField = (field: any) => {
    if (!field.conditional) return true;
    return evaluateConditional(field.conditional, formData);
  };

  // Filtruje viditelná pole na základě podmínek
  const visibleFields = step.fields.filter(shouldShowField);

  // Pomocná funkce pro získání ikony podle názvu
  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  // Pomocná funkce pro formátování hodnot v souhrnu s podporou odrážek
  const formatDisplayValueForSummary = (fieldId: string, value: any): string | null => {
    const displayValue = getFieldDisplayValue(fieldId, value);
    
    if (!displayValue || displayValue === 'Neuvedeno') {
      return null;
    }
    
    // Pole, která se mají zobrazit jako odrážky (multiselect pole)
    const bulletPointFields = [
      'fveType',
      'currentAppliances', 
      'futureAppliances',
      'heating',
      'installationLocation',
      'roofOrientation',
      'systemGoal',
      'systemSize',
      'contactTime'
    ];
    
    if (bulletPointFields.includes(fieldId) && displayValue.includes(', ')) {
      // Převést čárkami oddělený text na odrážky
      return displayValue.split(', ').map(item => `• ${item.trim()}`).join('<br/>');
    }
    
    return displayValue;
  };

  // Pomocná funkce pro vytvoření souhrnné karty
  const renderSummaryCard = (title: string, icon: string, data: Array<{key: string, value: any, label?: string}>, bgClass: string) => {
    // Zpracovat a filtrovat data
    const processedData = data.map(({ key, value, label }) => ({
      key,
      label: label || key,
      formattedValue: formatDisplayValueForSummary(key, value)
    })).filter(({ formattedValue }) => formattedValue !== null);
    
    // Pokud nejsou žádná platná data, nevykreslit kartu
    if (processedData.length === 0) return null;
    
    return (
    <div className={`${bgClass} rounded-xl p-6 border border-gray-200 shadow-sm`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          {getIcon(icon)}
        </div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-2 text-sm">
        {processedData.map(({ key, label, formattedValue }) => (
          <div key={key} className="flex justify-between items-start">
            <span className="font-medium text-gray-600">{label}:</span>
            <span className="text-gray-900 font-medium text-right flex-1 ml-2 break-words">
              <span dangerouslySetInnerHTML={{ __html: formattedValue }} />
            </span>
          </div>
        ))}
      </div>
    </div>
    );
  };

  // Pomocná funkce pro dynamické popisky
  const getUnitCountLabel = () => {
    const propertyType = getFieldDisplayValue('propertyType', formData.propertyType);
    return propertyType === 'Bytový dům' ? 'Počet bytových jednotek' : 'Počet jednotek';
  };

  // Speciální zobrazení pro krok souhrnu
  if (step.id === 'summary') {
    return (
      <div className="space-y-8">
        {/* Hlavička */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full mb-4">
            {getIcon(step.icon)}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{step.title}</h2>
          {step.description && (
            <p className="text-gray-600 text-lg">{step.description}</p>
          )}
        </div>

        {/* Souhrn karet s informacemi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Kontaktní údaje */}
          {renderSummaryCard(
            'Kontaktní údaje',
            'UserCircle',
            [
              { key: 'name', value: `${formData.firstName} ${formData.lastName}`, label: 'Jméno' },
              { key: 'email', value: formData.email, label: 'Email' },
              { key: 'phone', value: formData.phone, label: 'Telefon' },
              { key: 'company', value: formData.company, label: 'Společnost' },
            ],
            'bg-gray-50'
          )}

          {/* Informace o objektu */}
          {renderSummaryCard(
            'Informace o objektu',
            'Home',
            [
              { key: 'type', value: getFieldDisplayValue('propertyType', formData.propertyType), label: 'Typ' },
              { key: 'address', value: formData.address?.value || formData.address, label: 'Adresa' },
              { key: 'distributionArea', value: getFieldDisplayValue('distributionArea', formData.distributionArea), label: 'Distribuční území' },
              { key: 'adults', value: formData.adultsCount ? `${formData.adultsCount} dospělých` : null, label: 'Domácnost' },
              { key: 'units', value: formData.unitsCount ? `${formData.unitsCount} jednotek` : null, label: getUnitCountLabel() },
              { key: 'roof', value: formData.roofArea ? `${formData.roofArea} m²` : null, label: 'Plocha střechy' },
              { key: 'installationLocation', value: formData.installationLocation, label: 'Umístění instalace' },
              { key: 'timeline', value: formData.timeline, label: 'Očekávaný termín realizace' }
            ],
            'bg-gray-50'
          )}

          {/* Detaily FVE systému */}
          {renderSummaryCard(
            'Detaily FVE systému',
            'Zap',
            [
              { key: 'fveType', value: formData.fveType, label: 'Typ systému' },
              { key: 'batteryCapacity', value: formData.batteryCapacity, label: 'Očekávaná kapacita baterie' },
              { key: 'budget', value: formData.budget, label: 'Orientační rozpočet' }
            ],
            'bg-blue-50'
          )}

          {/* Energetické údaje a spotřeba */}
          {renderSummaryCard(
            'Energetické údaje a spotřeba',
            'BarChart3',
            [
              { key: 'annualConsumption', value: formData.annualConsumption, label: 'Roční spotřeba' },
              { key: 'monthlyBill', value: formData.annualElectricityCost, label: 'Roční náklady' },
              { key: 'currentAppliances', value: formData.currentAppliances, label: 'Současné spotřebiče' },
              { key: 'futureAppliances', value: formData.futureAppliances, label: 'Budoucí spotřebiče' },
              { key: 'heating', value: formData.heating, label: 'Způsob vytápění' },
              { key: 'currentWaterHeating', value: formData.currentWaterHeating, label: 'Ohřev vody' },
              { key: 'poolHeatPump', value: formData.poolHeatPump === 'yes' ? 'Ano' : (formData.poolHeatPump === 'no' ? 'Ne' : null), label: 'Tepelné čerpadlo k bazénu' },
              { key: 'electricCarType', value: formData.electricCarType, label: 'Typ elektromobilu' },
              { key: 'airConditioningCount', value: formData.airConditioningCount, label: 'Počet klimatizačních jednotek' },
              { key: 'generatorType', value: formData.generatorType, label: 'Typ generátoru' },
              { key: 'generatorBatteryCapacity', value: formData.generatorBatteryCapacity, label: 'Kapacita bateriového generátoru' },
              { key: 'dailyProfile', value: formData.dailyProfile, label: 'Denní profil spotřeby' },
              { key: 'seasonalProfile', value: formData.seasonalProfile, label: 'Sezónní profil spotřeby' }
            ],
            'bg-green-50'
          )}
        </div>

        {/* Závěrečná formulářová pole */}
        <div className="space-y-8">
          {step.groups?.map((group) => {
            const groupFields = visibleFields.filter(field => 
              group.fields.includes(field.id)
            );
            
            if (groupFields.length === 0) return null;

            return (
              <div key={group.id} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getIcon(group.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{group.title}</h3>
                    {group.description && (
                      <p className="text-sm text-gray-600">{group.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {groupFields.map((field) => (
                    <FormField
                      key={field.id}
                      field={field}
                      value={formData[field.id]}
                      onChange={(value) => onFieldChange(field.id, value)}
                      error={errors.find(e => e.field === field.id)}
                      formData={formData}
                      device={device}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Standardní zobrazení pro běžný krok průvodce
  return (
    <div className="space-y-8">
      {/* Hlavička kroku */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full mb-4 shadow-lg">
          <div className="text-white">
            {getIcon(step.icon)}
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{step.title}</h2>
        {step.description && (
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">{step.description}</p>
        )}
      </div>

      {/* Formulářová pole - seskupená */}
      <div className="space-y-8">
        {step.groups ? (
          step.groups.map((group) => {
            const groupFields = visibleFields.filter(field => 
              group.fields.includes(field.id)
            );
            
            if (groupFields.length === 0) return null;

            return (
              <div key={group.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getIcon(group.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{group.title}</h3>
                    {group.description && (
                      <p className="text-sm text-gray-600">{group.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {groupFields.map((field) => (
                    <FormField
                      key={field.id}
                      field={field}
                      value={formData[field.id]}
                      onChange={(value) => onFieldChange(field.id, value)}
                      error={errors.find(e => e.field === field.id)}
                      formData={formData}
                      device={device}
                    />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // Fallback pro kroky bez skupin
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="space-y-8">
              {visibleFields.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={formData[field.id]}
                  onChange={(value) => onFieldChange(field.id, value)}
                  error={errors.find(e => e.field === field.id)}
                  formData={formData}
                  device={device}
                  onGlobalFieldChange={onFieldChange}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};