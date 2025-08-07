import emailjs from '@emailjs/browser';
import { FormData } from '../types/wizard';
import { getFieldDisplayValue } from './utility';

// Inicializace EmailJS (pouze pro frontend použití)
// POZNÁMKA: Při reálném nasazení je třeba zadat skutečný veřejný klíč
// Toto je pouze pro ukázku - v produkci nahraďte skutečným klíčem
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendEmail = async (formData: FormData): Promise<void> => {
  // Formátování dat pro email
  const emailData = {
    to_email: 'priklad@email.cz', // Změňte na skutečný e-mail, kam mají chodit poptávky
    from_name: `${formData.firstName} ${formData.lastName}`,
    from_email: formData.email,
    phone: formData.phone,
    ico: formData.ico || 'Neuvedeno',
    
    property_type: getFieldDisplayValue('propertyType', formData.propertyType),
    address: formData.address,
    distribution_area: getFieldDisplayValue('distributionArea', formData.distributionArea),
    region: getFieldDisplayValue('region', formData.region),
    roof_area: formData.roofArea,
    roof_type: formData.roofType,
    
    annual_consumption: formData.annualConsumption,
    monthly_bill: formData.monthlyBill || 'Neuvedeno',
    budget: getFieldDisplayValue('budget', formData.budget),
    
    fve_type: getFieldDisplayValue('fveType', formData.fveType),
    timeline: getFieldDisplayValue('timeline', formData.timeline),
    notes: formData.notes || 'Žádné poznámky',
    
    submission_date: formData.submissionDate,
    contact_preference: getFieldDisplayValue('contactPreference', formData.contactPreference),
    contact_time: getFieldDisplayValue('contactTime', formData.contactTime),
    
    // Informace o nahraných souborech
    uploaded_files: checkForUploadedFiles(formData) ? 'Ano - soubory byly nahrány' : 'Žádné soubory nebyly nahrány',
    
    // Vytvoření formátovaného souhrnu
    summary: createEmailSummary(formData)
  };

  try {
    console.log('Email by byl odeslán s daty:', emailData);
    
    // Simulace odeslání e-mailu (pro ukázku)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Odkomentujte a nakonfigurujte při nasazení s EmailJS:
    /*
    const result = await emailjs.send(
      'YOUR_SERVICE_ID',  // ID služby z EmailJS
      'YOUR_TEMPLATE_ID', // ID šablony z EmailJS
      emailData
    );
    console.log('Email odeslán úspěšně', result);
    */
    
    console.log('Email odeslán úspěšně');
  } catch (error) {
    console.error('Nepodařilo se odeslat e-mail:', error);
    throw new Error('Nepodařilo se odeslat e-mail');
  }
};

const createEmailSummary = (formData: FormData): string => {

  // Kontrola nahraných souborů
  const hasUploadedFiles = checkForUploadedFiles(formData);
  // Vytvoření formátovaného textového souhrnu
  return `
NOVÁ POPTÁVKA
==================

KONTAKTNÍ ÚDAJE:
- Jméno: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Telefon: ${formData.phone}
${formData.ico ? `- IČO: ${formData.ico}` : ''}
${formData.distributionArea ? `- Kraj: ${getFieldDisplayValue('distributionArea', formData.distributionArea)}` : ''}
${formData.contactPreference ? `- Preferovaný kontakt: ${getFieldDisplayValue('contactPreference', formData.contactPreference)}` : ''}
${formData.contactTime && ['phone', 'both'].includes(formData.contactPreference) ? `- Vhodný čas: ${getFieldDisplayValue('contactTime', formData.contactTime)}` : ''}

OBJEKT:
- Typ: ${getFieldDisplayValue('propertyType', formData.propertyType)}
- Adresa: ${formData.address}
${formData.distributionArea ? `- Kraj: ${getFieldDisplayValue('distributionArea', formData.distributionArea)}` : ''}
${formData.adultsCount ? `- Domácnost: ${formData.adultsCount} dospělých` : ''}
${formData.unitsCount ? `- Počet jednotek: ${formData.unitsCount}` : ''}
${formData.roofArea ? `- Plocha střechy: ${formData.roofArea} m²` : ''}
${formData.groundArea ? `- Plocha na zemi: ${formData.groundArea} m²` : ''}
${formData.installationLocation ? `- Umístění instalace: ${Array.isArray(formData.installationLocation) ? formData.installationLocation.join(', ') : formData.installationLocation}` : ''}
${formData.timeline ? `- Očekávaný termín realizace: ${getFieldDisplayValue('timeline', formData.timeline)}` : ''}

FVE SYSTÉM:
${formData.fveType ? `- Typ FVE: ${getFieldDisplayValue('fveType', formData.fveType)}` : ''}
${formData.hasHeatPump ? `- Vlastní již tepelné čerpadlo: ${getFieldDisplayValue('hasHeatPump', formData.hasHeatPump)}` : ''}
${formData.heatPumpType ? `- Typ TČ: ${getFieldDisplayValue('heatPumpType', formData.heatPumpType)}` : ''}
${formData.batteryCapacity ? `- Baterie: ${formData.batteryCapacity}` : ''}

ENERGETICKÉ ÚDAJE:
${formData.annualConsumption ? `- Roční spotřeba: ${formData.annualConsumption}` : ''}
${formData.monthlyBill ? `- Měsíční účet: ${formData.monthlyBill}` : ''}
${formData.budget ? `- Rozpočet: ${getFieldDisplayValue('budget', formData.budget)}` : ''}

KONTAKTNÍ PREFERENCE:
${formData.contactPreference ? `- Způsob kontaktu: ${getFieldDisplayValue('contactPreference', formData.contactPreference)}` : ''}
${formData.contactTime && ['phone', 'both'].includes(formData.contactPreference) ? `- Vhodný čas: ${getFieldDisplayValue('contactTime', formData.contactTime)}` : ''}

${formData.notes ? `POZNÁMKY:\n${formData.notes}` : ''}

Datum podání: ${formData.submissionDate || new Date().toLocaleDateString('cs-CZ')}
  `.trim();
};

/**
 * Kontroluje, zda byly nahrány nějaké soubory
 */
const checkForUploadedFiles = (formData: FormData): boolean => {
  const fileFields = ['roofPhotos', 'electricityBill', 'buildingPlans', 'photos'];
  
  for (const fieldId of fileFields) {
    const fieldValue = formData[fieldId];
    if (Array.isArray(fieldValue) && fieldValue.length > 0) {
      return true;
    }
  }
  
  return false;
};