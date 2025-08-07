import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FormField as FormFieldType, ValidationError, OptionConditional } from '../types/wizard';
import { Upload, Calendar, AlertCircle, Check, Search, ChevronDown, ExternalLink, Calculator } from 'lucide-react';
import * as Icons from 'lucide-react';

interface FormFieldProps {
  field: FormFieldType;
  value: any;
  onChange: (value: any) => void;
  error?: ValidationError;
  formData?: any;
  device?: 'desktop' | 'tablet' | 'mobile';
  onGlobalFieldChange?: (fieldId: string, value: any) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  field, 
  value, 
  onChange, 
  error, 
  formData,
  device = 'desktop',
  onGlobalFieldChange
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [autocompleteResults, setAutocompleteResults] = useState<any[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showAreaCalculator, setShowAreaCalculator] = useState(false);
  const [buildingDimensions, setBuildingDimensions] = useState({ width: '', length: '' });
  const [roofSlope, setRoofSlope] = useState(30); // Výchozí sklon střechy
  const [dragOver, setDragOver] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Při prvním načtení komponenty nastavit soubory, pokud existují
  useEffect(() => {
    if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
      setFiles(value);
    }
  }, []);

  // Handler pro změnu souboru
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
      onChange([...files, ...newFiles]);
    }
  };

  // Handler pro drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
    onChange([...files, ...droppedFiles]);
  };
  // Handler pro odstranění souboru
  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange(newFiles);
  };

  // Handler pro vyhledávání v autocomplete
  const handleAutocompleteSearch = useCallback(async (query: string) => {
    if (!field.autocompleteConfig || query.length < 3) {
      setAutocompleteResults([]);
      setShowAutocomplete(false);
      return;
    }

    setIsSearching(true);
    try {
      const { apiUrl, apiKey, searchParam } = field.autocompleteConfig;
      
      // Specifické parametry pro Mapy.cz suggest API
      const url = `${apiUrl}?${searchParam}=${encodeURIComponent(query)}&type=regional.address&limit=8&lang=cs&apikey=${apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`Mapy.cz API error: ${response.status} ${response.statusText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Response is not JSON - possibly invalid API key');
        throw new Error('Response is not JSON - possibly invalid API key');
      }
      
      const data = await response.json();
      console.log('Mapy.cz suggest API response:', data);
      
      // Zpracování odpovědi z Mapy.com API
      if (data.items && Array.isArray(data.items)) {
        const processedResults = data.items.map(item => ({
          title: item.name || item.title || '',
          location: item.location || item.region || '',
          position: item.position || { lon: null, lat: null }
        }));
        console.log('Processed autocomplete results:', processedResults);
        setAutocompleteResults(processedResults);
        setShowAutocomplete(true);
      } else {
        console.log('No items found in API response');
        setAutocompleteResults([]);
        setShowAutocomplete(false);
      }
    } catch (error) {
      console.error('Autocomplete search failed:', error);
      setAutocompleteResults([]);
      setShowAutocomplete(false);
    } finally {
      setIsSearching(false);
    }
  }, [field.autocompleteConfig]);

  // Handler pro výběr položky z autocomplete
  const selectAutocompleteItem = async (item: any) => {
    console.log('Selected autocomplete item:', item);
    
    // Získání souřadnic pro reverzní geokódování
    const lon = item.position?.lon;
    const lat = item.position?.lat;
    const apiKey = field.autocompleteConfig?.apiKey;
    
    // Připravíme proměnné pro strukturovaná data pro PDF
    let postalCodeForPdf = null;
    let cityForPdf = null;
    let regionForPdf = null;
    let countryForPdf = null;
    let finalLon = lon || null;
    let finalLat = lat || null;
    
    // Pokus o získání strukturované adresy z rgeocode, pokud jsou souřadnice a API klíč
    if (lon && lat && apiKey) {
      setIsSearching(true);
      try {
        // Volání reverzního geokódování
        const rgecodeUrl = `https://api.mapy.cz/v1/rgeocode?lon=${lon}&lat=${lat}&apikey=${apiKey}`;
        console.log('Calling reverse geocoding:', rgecodeUrl);
        
        const rgecodeResponse = await fetch(rgecodeUrl);
        
        if (!rgecodeResponse.ok) {
          console.error(`Reverse geocoding API error: ${rgecodeResponse.status} ${rgecodeResponse.statusText}`);
          throw new Error(`HTTP error! status: ${rgecodeResponse.status}`);
        }
        
        const rgecodeData = await rgecodeResponse.json();
        console.log('Reverse geocoding API response:', rgecodeData);
        
        // Zpracování odpovědi z reverse geocoding
        if (rgecodeData.items && Array.isArray(rgecodeData.items) && rgecodeData.items.length > 0) {
          const firstResult = rgecodeData.items[0];
          
          if (firstResult.address && typeof firstResult.address === 'object') {
            const address = firstResult.address;
            postalCodeForPdf = address.postalCode || null;
            cityForPdf = address.city || null;
            regionForPdf = address.region || null;
            countryForPdf = address.country || null;
          }
          
          // Získání PSČ přímo z pole 'zip'
          postalCodeForPdf = firstResult.zip || null;
          
          // Fallback pro PSČ, pokud API nevrátilo
          if (!postalCodeForPdf && item.location) {
            const locationParts = item.location.split(',').map(p => p.trim());
            // Zkusíme najít PSČ v poslední části, pokud vypadá jako české PSČ
            const lastPart = locationParts[locationParts.length - 1];
            if (lastPart && /^\d{3}\s?\d{2}$/.test(lastPart)) { // Regex pro české PSČ
              postalCodeForPdf = lastPart;
            } else if (locationParts.length > 1) {
              // Zkusíme předposlední část, pokud poslední nebyla PSČ a je tam více částí
              const secondLastPart = locationParts[locationParts.length - 2];
              if (secondLastPart && /^\d{3}\s?\d{2}$/.test(secondLastPart)) {
                postalCodeForPdf = secondLastPart;
              }
            }
          }
          
          // Získání kraje z 'regionalStructure'
          if (firstResult.regionalStructure && Array.isArray(firstResult.regionalStructure)) {
            const regions = firstResult.regionalStructure.filter((rs: any) => rs.type === 'regional.region');
            if (regions.length > 0) {
              regionForPdf = regions[0].name || null;
            }
          }
          
          // Aktualizace souřadnic z přesnějšího zdroje
          if (firstResult.geometry && firstResult.geometry.coordinates) {
            finalLon = firstResult.geometry.coordinates[0] || lon;
            finalLat = firstResult.geometry.coordinates[1] || lat;
          }
        }
        
        // --- NOVÁ LOGIKA: Sekundární fallback, pokud rgeocode neposkytl PSČ/Kraj ---
        if (!postalCodeForPdf || !regionForPdf) { // Kontrola, zda data stále chybí
          console.warn("rgeocode neposkytl PSČ/Kraj, pokus o parsování z item.location.");
          const locationParts = item.location ? item.location.split(',').map(p => p.trim()) : [];
          if (locationParts.length > 0) {
            // Pokus o získání PSČ z poslední části, pokud vypadá jako PSČ
            const lastPart = locationParts[locationParts.length - 1];
            if (lastPart && /^\d{3}\s?\d{2}$/.test(lastPart)) { // Regex pro české PSČ
              postalCodeForPdf = lastPart;
            }
            
            // Získání města a kraje z remaining parts
            // Předpokládáme, že město je vždy první část
            if (!cityForPdf) cityForPdf = locationParts[0];
            
            // Pokud existuje druhá část a není to "Česko" nebo "Slovensko", považujeme ji za potenciální kraj
            if (locationParts.length > 1) {
              const potentialRegionOrCountry = locationParts[1];
              if (potentialRegionOrCountry !== 'Česko' && potentialRegionOrCountry !== 'Slovensko') {
                if (!regionForPdf) regionForPdf = potentialRegionOrCountry;
              } else {
                // Pokud je to země, přiřadíme ji do countryForPdf
                if (!countryForPdf) countryForPdf = potentialRegionOrCountry;
              }
            }
            
            // Pokud existuje třetí část, považujeme ji za zemi (pokud druhá byla kraj)
            if (locationParts.length > 2) {
              if (!countryForPdf) countryForPdf = locationParts[2];
            }
          }
        }
        // --- KONEC NOVÉ LOGIKY ---
        
      } catch (rgeocodeError) {
        console.error("rgeocode selhalo, fallback na parsování řetězce location:", rgeocodeError);
        // Fallback: parsování item.location pro city, region, country
        const locationParts = item.location ? item.location.split(',').map(p => p.trim()) : [];
        if (locationParts.length > 0) {
          // Pokus o získání PSČ z poslední části, pokud vypadá jako PSČ
          const lastPart = locationParts[locationParts.length - 1];
          if (lastPart && /^\d{3}\s?\d{2}$/.test(lastPart)) {
            postalCodeForPdf = lastPart;
          }
          
          // Získání města a kraje z remaining parts
          cityForPdf = locationParts[0];
          if (locationParts.length > 1) {
            const potentialRegionOrCountry = locationParts[1];
            if (potentialRegionOrCountry !== 'Česko' && potentialRegionOrCountry !== 'Slovensko') {
              regionForPdf = potentialRegionOrCountry;
            } else {
              countryForPdf = potentialRegionOrCountry;
            }
          }
          if (locationParts.length > 2) {
            countryForPdf = locationParts[2];
          }
        }
      } finally {
        setIsSearching(false);
      }
    } else {
      console.warn("Chybí lon/lat nebo API klíč pro rgeocode, fallback na parsování řetězce location.");
      // Fallback: parsování item.location, pokud nejsou souřadnice pro rgeocode
      const locationParts = item.location ? item.location.split(',').map(p => p.trim()) : [];
      if (locationParts.length > 0) {
        // Pokus o získání PSČ z poslední části, pokud vypadá jako PSČ
        const lastPart = locationParts[locationParts.length - 1];
        if (lastPart && /^\d{3}\s?\d{2}$/.test(lastPart)) {
          postalCodeForPdf = lastPart;
        }
        
        // Získání města a kraje z remaining parts
        cityForPdf = locationParts[0];
        if (locationParts.length > 1) {
          const potentialRegionOrCountry = locationParts[1];
          if (potentialRegionOrCountry !== 'Česko' && potentialRegionOrCountry !== 'Slovensko') {
            regionForPdf = potentialRegionOrCountry;
          } else {
            countryForPdf = potentialRegionOrCountry;
          }
        }
        if (locationParts.length > 2) {
          countryForPdf = locationParts[2];
        }
      }
    }
    
    // Vytvoření objektu adresy s kompletními daty
    const addressObject = {
      // Tato 'value' vlastnost se zobrazí v input poli.
      // Bude kombinovat 'title' a 'location' z vybrané položky našeptávače.
      value: item.title + (item.location ? `, ${item.location}` : ''),
      lon: finalLon,
      lat: finalLat,
      postalCode: postalCodeForPdf,
      city: cityForPdf,
      region: regionForPdf,
      country: countryForPdf
    };
    
    console.log('Final address object:', addressObject);
    
    // Uložení celého objektu adresy
    onChange(addressObject);
    
    // Vyčištění autocomplete
    setShowAutocomplete(false);
    setAutocompleteResults([]);
          
  };

  // Pomocná funkce pro získání hodnoty pro zobrazení
  const getDisplayValue = () => {
    if (field.id === 'address' && typeof value === 'object' && value !== null && value.value) {
      return value.value;
    }
    return value || '';
  };

  // Výpočet plochy střechy na základě rozměrů budovy
  const calculateRoofArea = () => {
    const width = parseFloat(buildingDimensions.width);
    const length = parseFloat(buildingDimensions.length);
    
    if (width && length) {
      // Výpočet plochy střechy s ohledem na sklon
      const baseArea = width * length;
      const slopeMultiplier = 1 / Math.cos(roofSlope * Math.PI / 180);
      const roofArea = Math.round(baseArea * slopeMultiplier);
      
      onChange(roofArea);
      setShowAreaCalculator(false);
      setBuildingDimensions({ width: '', length: '' });
    }
  };

  // Pomocná funkce pro získání ikony podle názvu
  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  // Filtrace možností pro budoucí spotřebiče na základě aktuálních
  const getFilteredOptions = () => {
    const allOptions = field.options || [];
    
    // Pro pole futureAppliances filtrovat podle currentAppliances
    if (field.id === 'futureAppliances' && formData?.currentAppliances) {
      const currentAppliances = Array.isArray(formData.currentAppliances) ? formData.currentAppliances : [];
      
      return allOptions.filter(option => {
        // Nejdříve zkontrolovat obecné podmínky
        if (option.conditional && !shouldShowOption(option, formData)) {
          return false;
        }
        
        // Speciální logika pro tepelné čerpadlo k bazénu
        if (option.value === 'pool-heat-pump') {
          return formData?.currentAppliances?.includes('pool') && formData?.poolHeatPump === 'no';
        }
        
        // Skrýt možnosti, které jsou už vybrané v současných spotřebičích
        // Ale zachovat možnost 'none' pokud není vybraná
        if (option.value === 'none') {
          return true;
        }
        
        // Mapování hodnot mezi current a future aplikacemi
        const mappedCurrentValues = {
          'electric-car': 'electric-car',
          'wallbox': 'electric-car', // wallbox je součástí elektromobilu
          'pool': 'pool',
          'air-conditioning': 'air-conditioning',
          'heat-pump': 'heat-pump',
          'generator': 'generator',
          'sauna': 'sauna',
          'washing-machine': 'washing-machine',
          'dishwasher': 'dishwasher',
          'dryer': 'dryer',
          'electric-stove': 'electric-stove',
          'ventilation': 'ventilation',
          'workshop': 'workshop',
          'elevator': 'elevator',
          'pressure-pumps': 'pressure-pumps',
          'fans': 'fans',
          'compressors': 'compressors',
          'industrial-cooling': 'industrial-cooling',
          'industrial-heating': 'industrial-heating',
          'ventilation-systems': 'ventilation-systems',
          'production-machines': 'production-machines',
          'intensive-lighting': 'intensive-lighting',
          'server-room': 'server-room',
          'hvac-systems': 'hvac-systems',
          'heavy-machinery': 'heavy-machinery',
          'conveyor-systems': 'conveyor-systems'
        };
        
        // Zkontrolovat, zda není tato možnost už vybraná v current aplikacích
        const mappedValue = mappedCurrentValues[option.value] || option.value;
        return !currentAppliances.includes(mappedValue);
      });
    }
    
    // Pro ostatní pole standardní filtrování podle podmínek
    return allOptions.filter(option => {
      if (!option.conditional) return true;
      return shouldShowOption(option, formData);
    });
  };
  
  // Pomocná funkce pro kontrolu podmínek možností
  const shouldShowOption = (option: any, formData: any): boolean => {
    if (!option.conditional) return true;
    
    return evaluateConditional(option.conditional, formData);
  };

  // Pomocná funkce pro vyhodnocení podmínek
  const evaluateConditional = (conditional: OptionConditional, formData: any): boolean => {
    const dependentValue = formData?.[conditional.dependsOn];
    let mainCondition = false;
    
    if (Array.isArray(dependentValue)) {
      mainCondition = conditional.values.some((value: string) => dependentValue.includes(value));
    } else {
      mainCondition = conditional.values.includes(dependentValue);
    }
    
    // Vyhodnocení AND podmínek
    if (conditional.and && conditional.and.length > 0) {
      const andResults = conditional.and.map(cond => evaluateConditional(cond, formData));
      mainCondition = mainCondition && andResults.every(result => result);
    }
    
    // Vyhodnocení OR podmínek
    if (conditional.or && conditional.or.length > 0) {
      const orResults = conditional.or.map(cond => evaluateConditional(cond, formData));
      mainCondition = mainCondition || orResults.some(result => result);
    }
    
    return mainCondition;
  };
  // Vykreslení posuvníku (slideru)
  const renderSlider = () => {
    if (!field.sliderConfig) return null;
    
    const { min, max, step, unit, marks } = field.sliderConfig;
    const currentValue = value || min;

    return (
      <div className="space-y-6">
        <div className="relative px-2">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer slider focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200"
            style={{
              background: `linear-gradient(to right, #6B7280 0%, #6B7280 ${((currentValue - min) / (max - min)) * 100}%, #E5E7EB ${((currentValue - min) / (max - min)) * 100}%, #E5E7EB 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-3 px-1">
            {marks?.map((mark) => (
              <span key={mark.value} className="text-xs font-medium">
                {mark.label}
              </span>
            ))}
          </div>
        </div>
        <div className="text-center">
          <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-xl font-bold text-lg shadow-sm">
            {currentValue}{unit}
          </span>
        </div>
      </div>
    );
  };

  // Vykreslení konkrétního typu formulářového pole
  const renderField = () => {
    switch (field.type) {
      case 'slider':
        return renderSlider();

      case 'autocomplete':
        return (
          <div className="relative">
            <div className="relative">
              {field.icon && device !== 'mobile' && (
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {getIcon(field.icon)}
                </div>
              )}
              <input
                type="text"
                id={field.id}
                value={field.id === 'address' && typeof value === 'object' && value !== null ? (value.value || '') : getDisplayValue()}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Okamžitá aktualizace hodnoty pro plynulé psaní
                  if (field.id === 'address') {
                    // Pro address pole zachovat object strukturu ale aktualizovat value
                    const currentAddress = (typeof value === 'object' && value !== null) ? value : {};
                    onChange({
                      ...currentAddress,
                      value: inputValue
                    });
                  } else {
                    onChange(inputValue);
                  }
                  
                  // Zrušení předchozího timeoutu
                  if (debounceTimeout.current) {
                    clearTimeout(debounceTimeout.current);
                  }
                  
                  // Nastavení nového timeoutu pro debounce
                  debounceTimeout.current = setTimeout(() => {
                    // Volat API pouze pokud je délka vstupu alespoň 3 znaky
                    if (inputValue.length >= 3) {
                      handleAutocompleteSearch(inputValue);
                    } else {
                      // Pokud je méně než 3 znaky, vyčistit výsledky
                      setAutocompleteResults([]);
                      setShowAutocomplete(false);
                    }
                  }, 500);
                }}
                onFocus={() => {
                  const displayValue = field.id === 'address' && typeof value === 'object' && value !== null ? (value.value || '') : getDisplayValue();
                  if (displayValue && displayValue.length >= 3) {
                    setShowAutocomplete(true);
                  }
                }}
                onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
                placeholder={field.placeholder}
                className={`w-full ${field.icon && device !== 'mobile' ? 'pl-12' : 'pl-4'} pr-12 py-4 border-2 rounded-xl focus:ring-4 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 bg-white shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500 ${
                  error ? 'border-red-400 ring-4 ring-red-100' : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
                </div>
              )}
            </div>
            
            {showAutocomplete && autocompleteResults.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                {autocompleteResults.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectAutocompleteItem(item)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 focus:bg-gray-50 focus:outline-none transition-colors duration-150"
                  >
                    <div className="font-semibold text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.location}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        );

      case 'text':
      case 'email':
      case 'phone':
      case 'address':
        return (
          <div className="space-y-3">
            <div className="relative">
              {field.icon && device !== 'mobile' && (
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {getIcon(field.icon)}
                </div>
              )}
              <input
                type={field.type === 'email' ? 'email' : 'text'}
                id={field.id}
                value={field.id === 'address' && typeof value === 'object' && value !== null ? (value.value || '') : getDisplayValue()}
                onChange={(e) => onChange(e.target.value)}
                placeholder={field.placeholder}
                className={`w-full ${field.icon && device !== 'mobile' ? 'pl-12' : 'pl-4'} pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 bg-white shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500 ${
                  error ? 'border-red-400 ring-4 ring-red-100' : 'border-gray-200 hover:border-gray-300'
                }`}
              />
            </div>
            
            {/* Speciální kalkulačka pro výpočet plochy střechy */}
            {field.id === 'roofArea' && field.enableAreaCalculation && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setShowAreaCalculator(!showAreaCalculator)}
                  className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Vypočítat z rozměrů budovy
                </button>
                
                {showAreaCalculator && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-3">Výpočet plochy střechy</h4>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-1">Šířka budovy (m)</label>
                        <input
                          type="number"
                          value={buildingDimensions.width}
                          onChange={(e) => setBuildingDimensions(prev => ({ ...prev, width: e.target.value }))}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="např. 12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-1">Délka budovy (m)</label>
                        <input
                          type="number"
                          value={buildingDimensions.length}
                          onChange={(e) => setBuildingDimensions(prev => ({ ...prev, length: e.target.value }))}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="např. 15"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-blue-700 mb-1">Sklon střechy: {roofSlope}°</label>
                      <input
                        type="range"
                        min="0"
                        max="60"
                        step="5"
                        value={roofSlope}
                        onChange={(e) => setRoofSlope(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={calculateRoofArea}
                        disabled={!buildingDimensions.width || !buildingDimensions.length}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      >
                        Vypočítat plochu
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAreaCalculator(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm font-medium"
                      >
                        Zrušit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div className="relative">
            {field.icon && device !== 'mobile' && (
              <div className="absolute left-4 top-4 text-gray-400">
                {getIcon(field.icon)}
              </div>
            )}
            <textarea
              id={field.id}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className={`w-full ${field.icon && device !== 'mobile' ? 'pl-12' : 'pl-4'} pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 bg-white shadow-sm hover:shadow-md resize-vertical text-gray-900 placeholder-gray-500 ${
                error ? 'border-red-400 ring-4 ring-red-100' : 'border-gray-200 hover:border-gray-300'
              }`}
            />
          </div>
        );

      case 'number':
        return (
          <div className="relative">
            {field.icon && device !== 'mobile' && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {getIcon(field.icon)}
              </div>
            )}
            <input
              type="number"
              id={field.id}
              value={value || ''}
              onChange={(e) => onChange(Number(e.target.value))}
              placeholder={field.placeholder}
              min={field.validation?.min}
              max={field.validation?.max}
              className={`w-full ${field.icon && device !== 'mobile' ? 'pl-12' : 'pl-4'} pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 bg-white shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500 ${
                error ? 'border-red-400 ring-4 ring-red-100' : 'border-gray-200 hover:border-gray-300'
              }`}
            />
          </div>
        );

      case 'select':
        return (
          <div className="relative">
            {field.icon && device !== 'mobile' && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                {getIcon(field.icon)}
              </div>
            )}
            <select
              id={field.id}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full ${field.icon && device !== 'mobile' ? 'pl-12' : 'pl-4'} pr-12 py-4 border-2 rounded-xl focus:ring-4 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer text-gray-900 ${
                error ? 'border-red-400 ring-4 ring-red-100' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <option value="" className="text-gray-500 py-3">Vyberte možnost...</option>
              {getFilteredOptions().map((option) => (
                <option key={option.value} value={option.value} className="py-3 px-4 hover:bg-gray-50 text-gray-900">
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>
        );

      case 'multiselect':
        return (
          <div className={`grid ${device === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
            {getFilteredOptions().map((option) => (
              <label
                key={option.value}
                className={`flex items-center space-x-4 p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg group ${
                  Array.isArray(value) && value.includes(option.value)
                    ? 'border-gray-400 bg-gradient-to-r from-gray-50 to-gray-100 shadow-md ring-2 ring-gray-200'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={Array.isArray(value) ? value.includes(option.value) : false}
                    onChange={(e) => {
                      const currentValues = Array.isArray(value) ? value : [];
                      if (e.target.checked) {
                        onChange([...currentValues, option.value]);
                      } else {
                        onChange(currentValues.filter((v) => v !== option.value));
                      }
                    }}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all duration-200 ${
                    Array.isArray(value) && value.includes(option.value)
                      ? 'border-gray-500 bg-gray-500'
                      : 'border-gray-300 group-hover:border-gray-400'
                  }`}>
                    {Array.isArray(value) && value.includes(option.value) && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
                {option.icon && device !== 'mobile' && (
                  <div className="text-gray-500 group-hover:text-gray-600 hidden md:block">
                    {getIcon(option.icon)}
                  </div>
                )}
                <span className="text-gray-700 font-medium group-hover:text-gray-900 flex-1 text-sm leading-tight">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        );

      case 'radio':
        return (
          <div className={`grid ${device === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
            {field.options?.map((option) => (
              <label
                key={option.value}
                className={`flex items-center space-x-4 p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg group ${
                  value === option.value
                    ? 'border-gray-400 bg-gradient-to-r from-gray-50 to-gray-100 shadow-md ring-2 ring-gray-200'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <input
                    type="radio"
                    name={field.id}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => onChange(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                    value === option.value
                      ? 'border-gray-500'
                      : 'border-gray-300 group-hover:border-gray-400'
                  }`}>
                    {value === option.value && (
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    )}
                  </div>
                </div>
                {option.icon && device !== 'mobile' && (
                  <div className="text-gray-500 group-hover:text-gray-600 hidden md:block">
                    {getIcon(option.icon)}
                  </div>
                )}
                <span className="text-gray-700 font-medium group-hover:text-gray-900 flex-1 text-sm leading-tight">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <label className={`flex items-start space-x-4 p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg group ${
            value ? 'border-gray-400 bg-gradient-to-r from-gray-50 to-gray-100 ring-2 ring-gray-200' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
          }`}>
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={value || false}
                onChange={(e) => onChange(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all duration-200 ${
                value ? 'border-gray-500 bg-gray-500' : 'border-gray-300 group-hover:border-gray-400'
              }`}>
                {value && <Check className="h-4 w-4 text-white" />}
              </div>
            </div>
            {field.icon && device !== 'mobile' && (
              <div className="text-gray-500 group-hover:text-gray-600 mt-0.5">
                {getIcon(field.icon)}
              </div>
            )}
            <div className="flex-1">
              <span className="text-gray-700 leading-tight group-hover:text-gray-900 font-medium">
                {field.linkText && field.linkUrl ? (
                  <>
                    Souhlasím s{' '}
                    <a 
                      href={field.linkUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline inline-flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {field.linkText}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </>
                ) : (
                  field.label
                )}
              </span>
            </div>
          </label>
        );

      case 'file':
        return (
          <div>
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 group cursor-pointer ${
                dragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById(`file-input-${field.id}`)?.click()}
            >
              <div className="text-gray-400 group-hover:text-gray-500 transition-colors duration-200">
                <Upload className="mx-auto h-12 w-12 mb-4" />
              </div>
              <div>
                <span className="text-gray-600 hover:text-gray-700 font-semibold text-lg">
                  Nahrát soubory
                </span>
                <input
                  id={`file-input-${field.id}`}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                />
                <p className="text-gray-500 text-sm mt-2">{field.placeholder}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Podporované formáty: JPG, PNG, PDF, DOC (max. 10MB na soubor)
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Můžete přetáhnout soubory sem nebo kliknout pro výběr
                </p>
              </div>
            </div>
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-500">
                        {getIcon('FileText')}
                      </div>
                      <span className="text-sm text-gray-700 truncate font-medium">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024 / 1024).toFixed(1)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-md hover:bg-red-50 transition-colors duration-200"
                    >
                      Odstranit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'date':
        return (
          <div className="relative">
            <input
              type="date"
              id={field.id}
              value={value || new Date().toISOString().split('T')[0]}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 bg-white shadow-sm hover:shadow-md text-gray-900 ${
                error ? 'border-red-400 ring-4 ring-red-100' : 'border-gray-200 hover:border-gray-300'
              }`}
            />
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        );

      case 'note':
        return (
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
            <div className="flex items-start space-x-3">
              <div className="text-blue-500 mt-0.5">
                {getIcon('Info')}
              </div>
              <p className="text-blue-800 leading-relaxed font-medium">{field.note}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Speciální případ pro checkbox pole - jiné rozložení
  if (field.type === 'checkbox') {
    return (
      <div className="space-y-4">
        {renderField()}
        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">{error.message}</span>
          </div>
        )}
        {field.note && (
          <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-200 leading-relaxed">
            {field.note}
          </p>
        )}
      </div>
    );
  }

  // Standardní rozložení pro všechny ostatní typy polí
  return (
    <div className="space-y-4">
      <label htmlFor={field.id} className="block">
        <div className="flex items-center space-x-3 mb-4">
          {field.icon && device !== 'mobile' && (
            <div className="text-gray-600">
              {getIcon(field.icon)}
            </div>
          )}
          <span className="text-base font-bold text-gray-800">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </div>
      </label>
      {renderField()}
      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm font-medium">{error.message}</span>
        </div>
      )}
      {field.note && (
        <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-200 leading-relaxed">
          {field.note}
        </p>
      )}
    </div>
  );
};