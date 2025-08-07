// Definice TypeScript typů pro průvodce (wizards)

export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'radio' | 'checkbox' | 'number' | 'email' | 'phone' | 'address' | 'file' | 'note' | 'date' | 'autocomplete' | 'slider';
  label: string;
  placeholder?: string;
  required?: boolean;
  icon?: string;
  options?: Array<{ 
    value: string; 
    label: string; 
    icon?: string;
    description?: string;
    conditional?: OptionConditional;
  }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  conditional?: OptionConditional;
  note?: string;
  group?: string;
  autocompleteConfig?: {
    apiUrl: string;
    apiKey: string;
    searchParam: string;
    responseField: string;
  };
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    unit?: string;
    marks?: Array<{ value: number; label: string }>;
  };
  linkText?: string;
  linkUrl?: string;
  enableAreaCalculation?: boolean;
}

export interface OptionConditional {
  dependsOn: string;
  values: string[];
  and?: OptionConditional[];
  or?: OptionConditional[];
}

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  fields: FormField[];
  conditional?: OptionConditional;
  groups?: Array<{
    id: string;
    title: string;
    description?: string;
    icon?: string;
    fields: string[];
  }>;
}

export interface FormData {
  [key: string]: any;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface WizardSettings {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    borderRadius: string;
    shadows: boolean;
    animations: boolean;
    gradientBackground: boolean;
    gradientDirection: string;
    gradientColors: string[];
  };
  behavior: {
    showProgressBar: boolean;
    progressBarStyle: 'bar' | 'steps' | 'circle' | 'minimal';
    allowBackNavigation: boolean;
    allowSkipSteps: boolean;
    autoSave: boolean;
    requireEmail: boolean;
    showBranding: boolean;
    stepTransition: 'fade' | 'slide' | 'zoom' | 'bounce';
  };
  completion: {
    message: string;
    redirectUrl?: string;
    collectAnalytics: boolean;
    showDownloadPdf: boolean;
    emailNotification: boolean;
    webhookUrl?: string;
    emailTemplate?: string;
    pdfTemplate?: string;
    pdfLogoUrl?: string;
    pdfFields?: string[];
  };
  embedding: {
    allowedDomains: string[];
    allowCustomization: boolean;
  };
  integrations: {
    emailService?: string;
    crmWebhook?: string;
    googleAnalytics?: string;
    facebookPixel?: string;
  };
}

export interface Wizard {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: WizardStep[];
  settings: WizardSettings;
}