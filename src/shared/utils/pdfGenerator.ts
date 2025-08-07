import * as LucideIcons from 'lucide-react';
import html2pdf from 'html2pdf.js';
import JSZip from 'jszip';
import { FormData, WizardStep, FormField, WizardSettings, OptionConditional } from '../types/wizard';
import { getFieldDisplayValue as getFieldDisplayValueFromUtility } from './utility';

/**
 * Generuje PDF dokument z dat formuláře pomocí html2pdf.js
 * Automaticky podporuje českou diakritiku, logo, strukturované formátování a statickou mapu
 * Pokud jsou nahrány soubory, vytvoří ZIP archiv s PDF a všemi soubory
 */
export const generatePDF = async (formData: FormData, wizardSteps: WizardStep[], wizardSettings: WizardSettings) => {
  // Vytvoření HTML obsahu
  const htmlContent = await generateHTMLContent(formData, wizardSteps, wizardSettings);
  
  // Konfigurace html2pdf
  const options = {
    margin: 10,
    filename: `Poptavka_FVE_${formData.lastName || 'klient'}_${formData.inquiryId || new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  // Kontrola, zda existují nahrané soubory
  const uploadedFiles = await collectUploadedFiles(formData, wizardSteps);
  
  if (uploadedFiles.length > 0) {
    // Vytvořit ZIP archiv s PDF a soubory
    const zip = new JSZip();
    
    // Generovat PDF jako blob
    const pdfBlob = await html2pdf().from(htmlContent).set(options).outputPdf('blob');
    
    // Přidat PDF do ZIP
    zip.file(`${options.filename}`, pdfBlob);
    
    // Přidat všechny nahrané soubory
    for (const file of uploadedFiles) {
      zip.file(file.name, file);
    }
    
    // Stáhnout ZIP archiv
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(zipBlob);
    downloadLink.download = `Poptavka_FVE_${formData.lastName || 'klient'}_${formData.inquiryId || new Date().toISOString().split('T')[0]}.zip`;
    downloadLink.click();
    
    // Vyčištění URL
    URL.revokeObjectURL(downloadLink.href);
  } else {
    // Standardní PDF stažení
    html2pdf().from(htmlContent).set(options).save();
  }
};

/**
 * Sbírá všechny nahrané soubory z formuláře
 */
const collectUploadedFiles = (formData: FormData, wizardSteps: WizardStep[]): File[] => {
  const files: File[] = [];
  
  for (const step of wizardSteps) {
    for (const field of step.fields) {
      if (field.type === 'file' && formData[field.id]) {
        const fieldFiles = formData[field.id];
        if (Array.isArray(fieldFiles)) {
          files.push(...fieldFiles.filter(f => f instanceof File));
        }
      }
    }
  }
  
  return files;
};

/**
 * Stáhne obrázek statické mapy a převede ho na Base64
 */
const getStaticMapImageBase64 = async (lon: number, lat: number, apiKey: string): Promise<string | null> => {
  // Konstanty podle funkčního kódu
  const SIZES = [800, 600, 512, 400, 300];
  const ZOOMS = [19, 18, 17, 16, 15, 14, 13, 12, 11];
  const PLACEHOLDER_KB = 30;
  
  if (!lon || !lat || !apiKey) return null;

  console.log('Starting robust map search for coordinates:', lon, lat);
  
  // Robustní vyhledávání podle funkčního kódu
  for (const size of SIZES) {
    for (const zoom of ZOOMS) {
      // URL podle funkčního kódu s api.mapy.com
      const mapUrl = `https://api.mapy.com/v1/static/map?lon=${lon}&lat=${lat}` +
                     `&zoom=${zoom}&width=${size}&height=${size}` +
                     `&mapset=aerial&scale=1` +
                     `&markers=color:red;${lon},${lat}` +
                     `&format=png&apikey=${apiKey}`;
      
      try {
        console.log(`Trying size: ${size}px, zoom: ${zoom}`);
        console.log('Map URL:', mapUrl);
        
        const response = await fetch(mapUrl, {
          mode: 'cors',
          headers: {
            'Accept': 'image/png',
          }
        });
        
        if (!response.ok) {
          console.log(`HTTP ${response.status} for size ${size}, zoom ${zoom} - trying next`);
          continue; // Zkusit další kombinaci
        }
        
        const blob = await response.blob();
        console.log(`Blob size: ${(blob.size / 1024).toFixed(1)} kB, type: ${blob.type}`);
        
        // Kontrola velikosti podle funkčního kódu
        if (blob.size / 1024 > PLACEHOLDER_KB) {
          console.log(`✓ Found suitable map: size ${size}px, zoom ${zoom}, ${(blob.size / 1024).toFixed(1)} kB`);
          
          // Kontrola, zda je blob skutečně obrázek
          if (!blob.type.startsWith('image/')) {
            console.error('Response is not an image:', blob.type);
            continue;
          }
          
          // Konverze na Base64
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = () => {
              console.error('FileReader error:', reader.error);
              resolve(null);
            };
            reader.readAsDataURL(blob);
          });
        } else {
          console.log(`Blob too small (${(blob.size / 1024).toFixed(1)} kB < ${PLACEHOLDER_KB} kB) - trying next`);
        }
      } catch (error) {
        console.error(`Error with size ${size}, zoom ${zoom}:`, error);
        continue; // Zkusit další kombinaci
      }
    }
  }
  
  console.log('❌ No suitable map image found for coordinates:', lon, lat);
  return null;
};

/**
 * Generuje HTML sekci s mapou
 */
const generateMapSection = async (formData: FormData, apiKey: string): Promise<string> => {
  // Pokusíme se získat souřadnice z objektu address nebo z backup polí
  const lon = formData.address?.lon || formData.addressLon;
  const lat = formData.address?.lat || formData.addressLat;

  console.log('Generating map section with coordinates:', lon, lat, 'API key available:', !!apiKey);

  if (!lon || !lat) {
    console.log('No coordinates available for map generation. Address object:', formData.address);
    return ''; // Pokud nejsou souřadnice, nic negenerujeme
  }

  if (!apiKey) {
    console.log('No API key available for map generation');
    return ''; // Pokud není API klíč, nic negenerujeme
  }
  const mapImageBase64 = await getStaticMapImageBase64(lon, lat, apiKey);

  if (!mapImageBase64) {
    console.log('Failed to get map image, skipping map section');
    console.log('Failed to get map image, skipping map section');
    return ''; // Pokud se nepodařilo získat obrázek, nic negenerujeme
  }

  console.log('Map section generated successfully');
  console.log('Map image data length:', mapImageBase64.length);
  return `
    <div class="map-container">
      <div class="card-title">
        <div class="title-icon">${getStepIcon('MapPin')}</div>
        <h3>Umístění objektu na mapě</h3>
      </div>
      <img src="${mapImageBase64}" alt="Mapa umístění" class="static-map-image">
      <p class="map-coordinates">Souřadnice: ${Number(lat).toFixed(4)}, ${Number(lon).toFixed(4)}</p>
    </div>
  `;
};

/**
 * Generuje HTML obsah pro PDF
 */
const generateHTMLContent = async (formData: FormData, wizardSteps: WizardStep[], wizardSettings: WizardSettings): Promise<string> => {
  const logoSection = generateLogoSection(wizardSettings.completion);
  const headerSection = generateHeaderSection(formData, wizardSettings.completion);
  const contentSection = generateContentSection(formData, wizardSteps);
  const mapSection = await generateMapSection(formData, wizardSettings.integrations?.mapyApiKey || '');
  const footerSection = generateFooterSection();
  
  return `
    <!DOCTYPE html>
    <html lang="cs">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Poptávka FVE ${formData.inquiryId}</title>
      <style>
        ${getCSS()}
      </style>
    </head>
    <body>
      <div class="pdf-container">
        ${logoSection}
        ${headerSection}
        ${contentSection}
        ${mapSection}
        ${footerSection}
      </div>
    </body>
    </html>
  `;
};

/**
 * Generuje logo a hlavičku
 */
const generateLogoSection = (pdfSettings?: any): string => {
  const logoUrl = pdfSettings?.pdfLogoUrl;
  
  if (logoUrl) {
    console.log('Using logo from pdfSettings:', logoUrl);
    return `
      <div class="header-wrapper with-logo">
        <div class="logo-container-absolute">
          <img src="${logoUrl}" alt="Logo" class="pdf-logo" crossorigin="anonymous" />
        </div>
        <div class="brand-info">
          <h1 class="brand-title">Průvodce výběrem fotovoltaiky</h1>
          <p class="brand-subtitle">Personalizovaná poptávka na míru</p>
        </div>
      </div>
    `;
  } else {
    console.log('No logo URL provided, using logo-free version');
    return `
      <div class="header-wrapper no-logo">
        <div class="brand-info centered">
          <h1 class="brand-title">Průvodce výběrem fotovoltaiky</h1>
          <p class="brand-subtitle">Personalizovaná poptávka na míru</p>
        </div>
      </div>
    `;
  }
};

/**
 * Generuje hlavičku dokumentu
 */
const generateHeaderSection = (formData: FormData, pdfSettings?: any): string => {
  const inquiryId = formData.inquiryId || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const currentDateTime = new Date().toLocaleString('cs-CZ');
  
  return `
    <div class="summary-card">
      <div class="card-header">
        <div class="inquiry-number">Poptávka #${inquiryId}</div>
        <div class="inquiry-date">${currentDateTime}</div>
      </div>
      
      <div class="quick-summary">
        <div class="summary-item">
          <div class="summary-label">Kontakt</div>
          <div class="summary-value">${formData.firstName} ${formData.lastName}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Email</div>
          <div class="summary-value">${formData.email}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Telefon</div>
          <div class="summary-value">${formData.phone}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Typ objektu</div>
          <div class="summary-value">${getFieldDisplayValueFromUtility('propertyType', formData.propertyType)}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Rozpočet</div>
          <div class="summary-value">${getFieldDisplayValueFromUtility('budget', formData.budget) || 'Neuvedeno'}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Adresa</div>
          <div class="summary-value">
            ${[
              formData.address?.value || formData.address,
              formData.address?.postalCode,
              formData.address?.region
            ].filter(Boolean).join(', ') || 'Neuvedeno'}
          </div>
        </div>
      </div>
    </div>
  `;
};

/**
 * Generuje hlavní obsah dokumentu
 */
const generateContentSection = (formData: FormData, wizardSteps: WizardStep[]): string => {
  let content = '<div class="content-grid">';
  
  for (const step of wizardSteps) {
    // Kontrola podmínek pro zobrazení kroku
    if (!shouldShowStep(step, formData)) {
      continue;
    }
    
    // Přeskočit kroky registrace a souhrnu v detailním obsahu
    if (step.id === 'registration' || step.id === 'summary') {
      continue;
    }
    
    const stepContent = generateStepContent(step, formData);
    if (stepContent.trim()) {
      content += `
        <div class="info-card">
          <div class="card-title">
            <div class="title-icon">${getStepIcon(step.icon)}</div>
            <h3>${step.title}</h3>
          </div>
          ${stepContent}
        </div>
      `;
    }
  }
  
  content += '</div>';
  return content;
};

/**
 * Generuje obsah pro jednotlivý krok
 */
const generateStepContent = (step: WizardStep, formData: FormData): string => {
  let content = '';
  
  if (step.groups && step.groups.length > 0) {
    for (const group of step.groups) {
      const groupFields = step.fields.filter(field => group.fields.includes(field.id));
      const visibleFields = groupFields.filter(field => 
        shouldShowField(field, formData) && hasValue(field, formData)
      );
      
      if (visibleFields.length > 0) {
        content += `<div class="field-group">`;
        if (group.title && visibleFields.length > 1) {
          content += `<div class="group-header">${group.title}</div>`;
        }
        
        for (const field of visibleFields) {
          content += generateFieldRow(field, formData);
        }
        
        content += `</div>`;
      }
    }
  } else {
    // Pole bez skupin
    const visibleFields = step.fields.filter(field => 
      shouldShowField(field, formData) && hasValue(field, formData)
    );
    
    for (const field of visibleFields) {
      content += generateFieldRow(field, formData);
    }
  }
  
  return content;
};

/**
 * Generuje řádek pro jednotlivé pole
 */
const generateFieldRow = (field: FormField, formData: FormData): string => {
  const value = formData[field.id];
  const displayValue = getFormattedFieldValueForPdf(field, value);
  
  // Přeskočit pole typu 'note', 'file' a checkbox pole s false hodnotou
  if (field.type === 'note' || field.type === 'file') {
    return '';
  }
  
  if (field.type === 'checkbox' && !value) {
    return '';
  }
  
  return `
    <div class="field-row">
      <div class="field-label">${field.label}</div>
      <div class="field-value">${displayValue}</div>
    </div>
  `;
};

/**
 * Získává ikonu pro krok jako SVG řetězec.
 */
const getStepIcon = (iconName?: string): string => {
  if (!iconName) return '<span class="pdf-icon-fallback">●</span>'; // Výchozí znak, pokud ikona není specifikována

  const IconComponent = (LucideIcons as any)[iconName];
  if (IconComponent) {
    // Optimalizované SVG ikony s lepším designem a konzistentním stylem
    const svgMap: { [key: string]: string } = {
      'UserCircle': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pdf-icon"><circle cx="12" cy="12" r="10"/><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/></svg>',
      'MapPin': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pdf-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
      'Triangle': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pdf-icon"><path d="M13.73 4.39 21 16.5a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5L10.27 4.39a1 1 0 0 1 1.46 0Z"/></svg>',
      'Zap': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pdf-icon"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>',
      'BarChart3': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pdf-icon"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
      'Plug': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0891B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pdf-icon"><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/></svg>',
      'Settings': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pdf-icon"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6"/><path d="M1 12h6m6 0h6"/></svg>',
      'Upload': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pdf-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>',
      'CheckCircle': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pdf-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="9,11 12,14 22,4"/></svg>'
    };
    return svgMap[iconName] || '<span class="pdf-icon-fallback">●</span>'; // Vrátí SVG nebo výchozí znak
  }
  return '<span class="pdf-icon-fallback">●</span>'; // Výchozí znak, pokud komponenta ikony není nalezena
};

/**
 * Získá čitelnou hodnotu pole pro PDF
 */
const getFormattedFieldValueForPdf = (field: FormField, value: any): string => {
  if (value === undefined || value === null || value === '') {
    return 'Neuvedeno';
  }
  
  // Speciální formátování pro checkbox a slider, které getFieldDisplayValueFromUtility neřeší
  switch (field.type) {
    case 'checkbox':
      return value ? 'Ano' : 'Ne';
    case 'slider':
      const unit = field.sliderConfig?.unit || '';
      return `${value}${unit}`;
    case 'multiselect':
      // Pro multiselect pole použijeme utility funkci a pak formátujeme s elegantnějšími odrážkami
      const displayValue = getFieldDisplayValueFromUtility(field.id, value);
      if (displayValue !== 'Neuvedeno' && displayValue.includes(', ')) {
        // Pokud utility vrátila seznam oddělený čárkami, převedeme na odrážky
        return displayValue.split(', ').map(item => `<span class="multiselect-item">▪ ${item.trim()}</span>`).join('<br/>');
      }
      return displayValue;
    default:
      // Pro všechny ostatní typy polí použijeme getFieldDisplayValueFromUtility
      // Tato funkce již správně převádí systémové hodnoty na popisky pro select, radio atd.
      return getFieldDisplayValueFromUtility(field.id, value);
  }
};

/**
 * Generuje patičku dokumentu
 */
const generateFooterSection = (): string => {
  return `
    <div class="footer">
      <div class="footer-content">
        <p>Tento dokument byl vygenerován aplikací průvodce výběrem fotovoltaiky.</p>
        <p>Kontakt: Ondřej Bulíř • Tel: 721 37 48 96 • Email: bulir.ondra@gmail.com</p>
        <p>Společnost: Vyber s.r.o.</p>
      </div>
    </div>
  `;
};

/**
 * Kontroluje, zda má pole hodnotu
 */
const hasValue = (field: FormField, formData: FormData): boolean => {
  if (!field || !field.id || !formData) {
    return false;
  }
  
  const value = formData[field.id];
  
  // Lepší kontrola prázdných hodnot
  if (value === undefined || value === null || value === '' || value === 'undefined') {
    return false;
  }
  
  if (Array.isArray(value) && value.length === 0) {
    return false;
  }
  
  // Speciální kontrola pro false boolean hodnoty (kromě checkboxu)
  if (typeof value === 'boolean' && !value && field.type !== 'checkbox') {
    return false;
  }
  
  // Speciální kontrola pro checkbox pole - skrýt pokud je false
  if (field.type === 'checkbox' && !value) {
    return false;
  }
  
  return true;
};

/**
 * Kontroluje, zda by měl být krok zobrazen
 */
const shouldShowStep = (step: WizardStep, formData: FormData): boolean => {
  if (!step || !formData) return false;
  if (!step.conditional) return true;
  
  const dependentValue = formData[step.conditional.dependsOn];
  
  if (Array.isArray(dependentValue)) {
    return step.conditional.values.some(value => dependentValue.includes(value));
  }
  
  return step.conditional.values.includes(dependentValue);
};

/**
 * Kontroluje, zda by mělo být pole zobrazeno
 */
const shouldShowField = (field: FormField, formData: FormData): boolean => {
  if (!field || !formData) return false;
  if (!field.conditional) return true;
  
  const dependentValue = formData[field.conditional.dependsOn];
  
  if (Array.isArray(dependentValue)) {
    return field.conditional.values.some(value => dependentValue.includes(value));
  }
  
  return field.conditional.values.includes(dependentValue);
};

/**
 * Apple-like CSS styly pro PDF
 */
const getCSS = (): string => {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.4;
      color: #1d1d1f;
      background-color: #ffffff;
      font-size: 11px;
      font-weight: 400;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    
    .pdf-container {
      max-width: 210mm;
      margin: 0 auto;
      padding: 0;
      background: white;
    }
    
    /* Enhanced Icon Styling */
    .pdf-icon {
      display: inline-block;
      vertical-align: middle;
      margin-right: 2px;
    }
    
    .pdf-icon-fallback {
      color: #6B7280;
      font-size: 14px;
      font-weight: 600;
      margin-right: 4px;
    }
    
    .multiselect-item {
      color: #4B5563;
      font-weight: 500;
      font-size: 11px;
      display: inline-block;
      margin-bottom: 2px;
    }
    
    /* Header Section */
    .header-wrapper {
      position: relative;
      padding: 30px 20px 24px 20px;
      border-bottom: 3px solid #E5E7EB;
      margin-bottom: 24px;
      min-height: 120px;
    }
    
    .header-wrapper.with-logo {
      text-align: left;
    }
    
    .header-wrapper.no-logo {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .logo-container-absolute {
      position: absolute;
      top: 10px;
      right: 20px;
      max-width: 200px;
      max-height: 80px;
      overflow: hidden;
      z-index: 10;
    }
    
    .pdf-logo {
      width: 100%;
      height: 100%;
      max-height: 80px;
      max-width: 200px;
      object-fit: contain;
      border-radius: 6px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    
    .brand-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-right: 220px;
      text-align: left;
    }
    
    .brand-info.centered {
      text-align: center;
      padding-right: 0;
    }
    
    .brand-title {
      font-size: 24px;
      font-weight: 800;
      color: #1d1d1f; /* Pevná barva místo gradientu */
      margin-bottom: 4px;
      letter-spacing: -0.6px;
    }
    
    .brand-subtitle {
      font-size: 15px;
      color: #6B7280;
      font-weight: 600;
      letter-spacing: -0.1px;
    }
    
    /* Summary Card */
    .summary-card {
      background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%);
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 20px;
      color: white;
      box-shadow: 0 8px 25px rgba(79, 70, 229, 0.2);
      position: relative;
      overflow: hidden;
    }
    
    .summary-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
      pointer-events: none;
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.25);
      position: relative;
      z-index: 1;
    }
    
    .inquiry-number {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.4px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .inquiry-date {
      font-size: 13px;
      opacity: 0.95;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .quick-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
      position: relative;
      z-index: 1;
    }
    
    .summary-item {
      background: rgba(255, 255, 255, 0.15);
      padding: 12px;
      border-radius: 12px;
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.2s ease;
    }
    
    .summary-label {
      font-size: 10px;
      opacity: 0.85;
      margin-bottom: 4px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }
    
    .summary-value {
      font-size: 13px;
      font-weight: 700;
      word-break: break-word;
      line-height: 1.3;
    }
    
    /* Content Grid */
    .content-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 20px;
    }
    
    /* Info Cards */
    .info-card {
      background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
      border-radius: 16px;
      padding: 16px;
      break-inside: avoid;
      page-break-inside: avoid;
      border: 1px solid #E5E7EB;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      position: relative;
    }
    
    .info-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%);
      border-radius: 16px 16px 0 0;
    }
    
    .card-title {
      display: flex;
      align-items: center;
      margin-bottom: 14px;
      gap: 12px;
      padding-top: 4px;
    }
    
    .title-icon {
      font-size: 20px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .card-title h3 {
      font-size: 16px;
      font-weight: 800;
      color: #1d1d1f;
      letter-spacing: -0.3px;
    }
    
    /* Field Groups */
    .field-group {
      margin-bottom: 14px;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    
    .field-group:last-child {
      margin-bottom: 0;
    }
    
    .group-header {
      font-size: 11px;
      font-weight: 700;
      color: #4F46E5;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      break-after: avoid;
      page-break-after: avoid;
      padding-bottom: 4px;
      border-bottom: 2px solid #E5E7EB;
    }
    
    /* Field Rows */
    .field-row {
      display: grid;
      grid-template-columns: minmax(100px, 1fr) 2fr;
      gap: 8px;
      margin-bottom: 8px;
      align-items: flex-start;
      padding: 8px 0;
      border-bottom: 1px solid #F3F4F6;
      break-inside: avoid;
      page-break-inside: avoid;
      transition: all 0.2s ease;
    }
    
    .field-row:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
    
    .field-row:hover {
      background-color: rgba(79, 70, 229, 0.02);
      border-radius: 8px;
      padding-left: 8px;
      padding-right: 8px;
    }
    
    .field-label {
      font-size: 12px;
      font-weight: 600;
      color: #6B7280;
      line-height: 1.4;
      word-wrap: break-word;
      hyphens: auto;
      text-transform: capitalize;
    }
    
    .field-value {
      font-size: 12px;
      color: #1d1d1f;
      font-weight: 600;
      word-wrap: break-word;
      word-break: break-word;
      line-height: 1.4;
      hyphens: auto;
    }
    
    /* Footer */
    .footer {
      margin-top: 28px;
      padding-top: 16px;
      border-top: 3px solid #E5E7EB;
      background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
      border-radius: 16px;
      padding: 16px;
    }
    
    .footer-content {
      text-align: center;
      color: #6B7280;
      font-size: 9px;
      line-height: 1.4;
      font-weight: 500;
    }
    
    .footer-content p {
      margin-bottom: 4px;
      letter-spacing: 0.2px;
    }
    
    .footer-content p:last-child {
      margin-bottom: 0;
      font-weight: 600;
      color: #4B5563;
    }
    
    /* Print Optimizations */
    @media print {
      .pdf-container {
        margin: 0;
        padding: 0;
      }
      
      .content-grid {
        grid-template-columns: 1fr;
      }
      
      .info-card {
        page-break-inside: avoid;
        break-inside: avoid;
        box-shadow: none;
      }
      
      .field-row {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
        font-size: 12px;
      }
      
      .summary-card {
        box-shadow: none;
      }
    }
    
    /* Responsive Design */
    @media (max-width: 600px) {
      .header-wrapper,
      .header-wrapper.with-logo {
        flex-direction: column;
        text-align: center;
        gap: 16px;
      }
      
      .pdf-logo {
        margin-right: 0;
        margin-bottom: 12px;
        height: 40px;
        max-width: 100px;
      }
      
      .quick-summary {
        grid-template-columns: 1fr;
      }
      
      .field-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
      }
      
      .field-label,
      .field-value {
        flex-basis: 100%;
      }
      
      .field-label {
        font-weight: 600;
        color: #4B5563;
        font-size: 11px;
      }
      
      .field-value {
        font-size: 12px;
      }
      
      .brand-title {
        font-size: 24px;
      }
      
      .brand-subtitle {
        font-size: 15px;
      }
    }
    
    /* Typography Enhancements */
    h1, h2, h3, h4, h5, h6 {
      font-weight: 800;
      letter-spacing: -0.3px;
      line-height: 1.3;
      color: #1d1d1f;
    }
    
    strong {
      font-weight: 700;
      color: #1d1d1f;
    }
    
    /* Enhanced Color System */
    .text-primary { color: #1d1d1f; font-weight: 600; }
    .text-secondary { color: #6B7280; font-weight: 500; }
    .text-tertiary { color: #9CA3AF; font-weight: 400; }
    .text-accent { color: #4F46E5; font-weight: 600; }
    
    /* Enhanced Spacing System */
    .mb-1 { margin-bottom: 6px; }
    .mb-2 { margin-bottom: 10px; }
    .mb-3 { margin-bottom: 14px; }
    .mb-4 { margin-bottom: 18px; }
    .mb-5 { margin-bottom: 22px; }
    .mb-6 { margin-bottom: 26px; }
    .mb-7 { margin-bottom: 30px; }
    .mb-8 { margin-bottom: 34px; }
    
    /* Enhanced Utilities */
    .break-words { word-break: break-word; }
    .text-center { text-align: center; }
    .font-medium { font-weight: 600; }
    .font-semibold { font-weight: 600; }
    .font-bold { font-weight: 800; }
    .rounded { border-radius: 8px; }
    .rounded-lg { border-radius: 12px; }
    .rounded-xl { border-radius: 16px; }
    .shadow-sm { box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }
    .shadow { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
    .shadow-lg { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15); }
    
    /* Map Styles */
    .map-container {
      background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 20px;
      border: 1px solid #E5E7EB;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      break-inside: avoid;
      page-break-inside: avoid;
      page-break-before: always;
      position: relative;
    }
    
    .map-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #10B981 0%, #059669 50%, #047857 100%);
      border-radius: 16px 16px 0 0;
    }
    
    .static-map-image {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 12px auto;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border: 2px solid #E5E7EB;
      object-fit: contain;
    }
    
    .map-coordinates {
      text-align: center;
      font-size: 10px;
      color: #6B7280;
      margin-top: 8px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .map-container {
      background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 20px;
      border: 1px solid #E5E7EB;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      break-inside: avoid;
      page-break-inside: avoid;
      position: relative;
    }
    
    .map-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #10B981 0%, #059669 50%, #047857 100%);
      border-radius: 16px 16px 0 0;
    }
    
    .static-map-image {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 12px auto;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border: 2px solid #E5E7EB;
    }
    
    .map-coordinates {
      text-align: center;
      font-size: 10px;
      color: #6B7280;
      margin-top: 8px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
  `;
};