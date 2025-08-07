import React, { useState, useCallback, useEffect } from 'react';
import { FormData, ValidationError, WizardStep, WizardSettings } from '../types/wizard';
import { ProgressBar } from './ProgressBar';
import { StepContent } from './StepContent';
import { validateStep } from '../utils/validation';
import { generatePDF } from '../utils/pdfGenerator';
import { sendEmail } from '../utils/emailService';
import { ChevronLeft, ChevronRight, Download, Send, CheckCircle, Home, AlertTriangle, X } from 'lucide-react';

interface WizardProps {
  steps: WizardStep[];
  settings?: Partial<WizardSettings>;
  onComplete?: (data: FormData) => void;
  onBack?: () => void;
}

export const Wizard: React.FC<WizardProps> = ({ 
  steps,
  settings = {},
  onComplete,
  onBack 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    submissionDate: new Date().toISOString().split('T')[0],
    inquiryId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<'pdf' | 'submit' | null>(null);
  const [hasGivenConsent, setHasGivenConsent] = useState(false);

  // Detekce typu zařízení při načtení komponenty
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDevice('mobile');
      } else if (width < 1024) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    handleResize(); // Počáteční kontrola
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatické zaškrtnutí tepelného čerpadla v současných spotřebičích
  useEffect(() => {
    if (formData.hasHeatPump === 'yes' && currentStepIndex === 5) { // Krok 6 - Elektrické spotřebiče
      const currentAppliances = Array.isArray(formData.currentAppliances) ? formData.currentAppliances : [];
      if (!currentAppliances.includes('heat-pump')) {
        setFormData(prev => ({
          ...prev,
          currentAppliances: [...currentAppliances, 'heat-pump']
        }));
      }
    }
  }, [formData.hasHeatPump, currentStepIndex]);
  // Aktuální krok a související data
  const currentStep = steps[currentStepIndex];
  const stepTitles = steps.map(step => step.title);
  const stepIcons = steps.map(step => step.icon || '');

  // Výchozí nastavení průvodce
  const defaultSettings: WizardSettings = {
    theme: {
      primaryColor: '#374151',
      secondaryColor: '#6B7280',
      accentColor: '#3B82F6',
      backgroundColor: '#FFFFFF',
      textColor: '#111827',
      fontFamily: 'Inter',
      borderRadius: '12px',
      shadows: true,
      animations: true,
      gradientBackground: true,
      gradientDirection: 'to-br',
      gradientColors: ['#f8fafc', '#ffffff', '#f1f5f9'],
    },
    behavior: {
      showProgressBar: true,
      progressBarStyle: 'steps',
      allowBackNavigation: true,
      allowSkipSteps: false,
      autoSave: true,
      requireEmail: true,
      showBranding: false,
      stepTransition: 'slide',
    },
    completion: {
      message: 'Děkujeme za vyplnění průvodce! Vaše poptávka byla úspěšně odeslána.',
      collectAnalytics: true,
      showDownloadPdf: true,
      emailNotification: true,
      pdfFields: [],
    },
    embedding: {
      allowedDomains: [],
      allowCustomization: true,
    },
    integrations: {},
  };

  // Sloučení výchozího nastavení s vlastním nastavením
  const mergedSettings: WizardSettings = {
    ...defaultSettings,
    ...settings,
    theme: { ...defaultSettings.theme, ...settings.theme },
    behavior: { ...defaultSettings.behavior, ...settings.behavior },
    completion: { ...defaultSettings.completion, ...settings.completion },
    embedding: { ...defaultSettings.embedding, ...settings.embedding },
    integrations: { ...defaultSettings.integrations, ...settings.integrations },
  };

  // Handler pro změny hodnot formulářových polí
  const handleFieldChange = useCallback((fieldId: string, value: any) => {
    console.log(`Field change: ${fieldId} =`, value);
    
    // Speciální zpracování pro pole address - extrakce souřadnic
    if (fieldId === 'address' && typeof value === 'object' && value !== null) {
      console.log('Processing address object:', value);
      setFormData(prev => ({
        ...prev,
        [fieldId]: value,
        addressLon: value.lon,
        addressLat: value.lat
      }));
    } else {
      setFormData(prev => ({ ...prev, [fieldId]: value }));
    }
    
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    // Odstranění chyb pro pole při začátku psaní
    setErrors(prev => prev.filter(error => error.field !== fieldId));
    
    // Debug logging pro sledování změn formData
    setTimeout(() => {
      console.log('Updated formData:', formData);
    }, 50);
  }, []);

  // Určuje, zda by měl být krok zobrazen na základě podmínek
  const shouldShowStep = (step: WizardStep): boolean => {
    if (!step.conditional) return true;
    
    const dependentValue = formData[step.conditional.dependsOn];
    if (Array.isArray(dependentValue)) {
      return step.conditional.values.some(value => dependentValue.includes(value));
    }
    return step.conditional.values.includes(dependentValue);
  };

  // Získá seznam viditelných kroků na základě aktuálních dat formuláře
  const getVisibleSteps = (): WizardStep[] => {
    return steps.filter(shouldShowStep);
  };

  // Validace aktuálního kroku
  const validateCurrentStep = (): boolean => {
    const stepErrors = validateStep(currentStep, formData);
    setErrors(stepErrors);
    return stepErrors.length === 0;
  };

  // Handler pro přechod na další krok
  const handleNext = () => {
    if (validateCurrentStep()) {
      const visibleSteps = getVisibleSteps();
      const currentVisibleIndex = visibleSteps.findIndex(step => step.id === currentStep.id);
      
      // Označení aktuálního kroku jako dokončeného
      const currentStepNumber = currentVisibleIndex + 1;
      if (!completedSteps.includes(currentStepNumber)) {
        setCompletedSteps(prev => [...prev, currentStepNumber]);
      }
      
      // Pokud je krok souhrn, automaticky zaškrtnout souhlas GDPR
      if (currentStep.id === 'summary') {
        setFormData(prev => ({ ...prev, gdprConsent: true }));
      }
      
      if (currentVisibleIndex < visibleSteps.length - 1) {
        // Najít další viditelný krok v původním poli kroků
        const nextVisibleStep = visibleSteps[currentVisibleIndex + 1];
        const nextStepIndex = steps.findIndex(step => step.id === nextVisibleStep.id);
        setCurrentStepIndex(nextStepIndex);
        
        // Plynulé posunutí na začátek stránky
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Handler pro návrat na předchozí krok
  const handlePrevious = () => {
    // Respektovat nastavení allowBackNavigation
    if (!mergedSettings.behavior.allowBackNavigation) return;
    
    const visibleSteps = getVisibleSteps();
    const currentVisibleIndex = visibleSteps.findIndex(step => step.id === currentStep.id);
    
    if (currentVisibleIndex > 0) {
      // Najít předchozí viditelný krok v původním poli kroků
      const prevVisibleStep = visibleSteps[currentVisibleIndex - 1];
      const prevStepIndex = steps.findIndex(step => step.id === prevVisibleStep.id);
      setCurrentStepIndex(prevStepIndex);
      
      // Plynulé posunutí na začátek stránky
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handler pro kliknutí na krok v progress baru
  const handleStepClick = (stepIndex: number) => {
    // Respektovat nastavení allowSkipSteps
    if (!mergedSettings.behavior.allowSkipSteps) return;
    
    const visibleSteps = getVisibleSteps();
    const targetStep = visibleSteps[stepIndex];
    const targetStepIndex = steps.findIndex(step => step.id === targetStep.id);
    
    setCurrentStepIndex(targetStepIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler pro zobrazení modálního okna se souhlasem
  const showConsentDialog = (action: 'pdf' | 'submit') => {
    // Pokud už uživatel dal souhlas, přímo provést akci
    if (hasGivenConsent) {
      if (action === 'pdf') {
        handleDownloadPDFDirect();
      } else if (action === 'submit') {
        handleSubmitDirect();
      }
      return;
    }

    setPendingAction(action);
    setShowConsentModal(true);
  };

  // Handler pro potvrzení souhlasu
  const handleConsentConfirm = () => {
    setShowConsentModal(false);
    setHasGivenConsent(true);
    
    // Nastavit souhlas do formData
    setFormData(prev => ({ ...prev, gdprConsent: true }));
    
    // Provést původní akci
    if (pendingAction === 'pdf') {
      handleDownloadPDFDirect();
    } else if (pendingAction === 'submit') {
      handleSubmitDirect();
    }
    
    setPendingAction(null);
  };

  // Handler pro zrušení souhlasu
  const handleConsentCancel = () => {
    setShowConsentModal(false);
    setPendingAction(null);
  };
  // Přímé odeslání po souhlasu
  const handleSubmitDirect = async () => {
    if (!validateCurrentStep()) return;
    
    setIsSubmitting(true);
    
    try {
      // Pokud uživatel nechce být kontaktován, pouze zobrazit dokončení
      if (formData.contactPreference === 'research-only') {
        setIsCompleted(true);
        if (onComplete) onComplete(formData);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      // Odeslat e-mail s poptávkou
      await sendEmail(formData);
      setIsCompleted(true);
      if (onComplete) onComplete(formData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Chyba při odesílání formuláře:', error);
      alert('Došlo k chybě při odesílání poptávky. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler pro odeslání průvodce
  const handleSubmit = async () => {
    // Vždy zobrazit dialog, pokud nebyl ještě souhlas dán
    if (!hasGivenConsent && !formData.gdprConsent) {
      showConsentDialog('submit');
      return;
    }
    
    await handleSubmitDirect();
  };

  // Přímé stažení PDF po souhlasu
  const handleDownloadPDFDirect = async () => {
    if (!validateCurrentStep()) {
      alert('Prosím vyplňte všechna povinná pole před stažením PDF.');
      return;
    }
    
    // Detailní logování formData před generováním PDF
    console.log('=== PDF GENERATION DEBUG ===');
    console.log('Full formData before PDF generation:', JSON.stringify(formData, null, 2));
    console.log('Address data check:');
    console.log('- address object:', formData.address);
    console.log('- address.value:', formData.address?.value);
    console.log('- address.lon:', formData.address?.lon);
    console.log('- address.lat:', formData.address?.lat);
    console.log('- addressLon (backup):', formData.addressLon);
    console.log('- addressLat (backup):', formData.addressLat);
    console.log('=== END PDF DEBUG ===');
    
    // Předat celé nastavení průvodce pro přístup k API klíčům a generování mapy
    await generatePDF(formData, steps, mergedSettings);
  };

  // Handler pro stažení PDF se souhrnem
  const handleDownloadPDF = async () => {
    // Nejprve zkontrolovat validaci
    if (!validateCurrentStep()) {
      alert('Prosím vyplňte všechna povinná pole před stažením PDF.');
      return;
    }
    
    // Pokud není souhlas, zobrazit dialog
    if (!hasGivenConsent && !formData.gdprConsent) {
      showConsentDialog('pdf');
      return;
    }
    
    await handleDownloadPDFDirect();
  };

  // Handler pro návrat na hlavní stránku
  const handleBackToHome = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.reload();
    }
  };

  // Stav navigace a kroků
  const visibleSteps = getVisibleSteps();
  const currentVisibleIndex = visibleSteps.findIndex(step => step.id === currentStep.id);
  const isFirstStep = currentVisibleIndex === 0;
  const isLastStep = currentVisibleIndex === visibleSteps.length - 1;
  const showSubmitButton = formData.contactPreference !== 'research-only';
  const hasValidationErrors = errors.length > 0;

  // Zobrazení obrazovky po dokončení průvodce
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full mb-8 shadow-2xl">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {mergedSettings.completion.message}
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {formData.contactPreference === 'research-only' 
                ? 'Vaše data byla zpracována a můžete si stáhnout PDF souhrn s informacemi.'
                : 'Děkujeme za vyplnění průvodce. Vaše poptávka byla odeslána a brzy se vám ozveme s personalizovanou nabídkou.'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {mergedSettings.completion.showDownloadPdf && (
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Stáhnout PDF souhrn
                </button>
              )}
              
              <button
                onClick={handleBackToHome}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Home className="h-5 w-5 mr-2" />
                Zpět na hlavní stránku
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Hlavní zobrazení průvodce
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {mergedSettings.behavior.showProgressBar && (
          <ProgressBar
            currentStep={currentVisibleIndex + 1}
            totalSteps={visibleSteps.length}
            stepTitles={visibleSteps.map(step => step.title)}
            stepIcons={visibleSteps.map(step => step.icon || '')}
            onStepClick={mergedSettings.behavior.allowSkipSteps ? handleStepClick : undefined}
            completedSteps={completedSteps}
            primaryColor={mergedSettings.theme.primaryColor}
            secondaryColor={mergedSettings.theme.secondaryColor}
          />
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
          <StepContent
            step={currentStep}
            formData={formData}
            onFieldChange={handleFieldChange}
            errors={errors}
            device={device}
          />

          <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-8 border-t border-gray-200 space-y-4 sm:space-y-0">
            <button
              onClick={handlePrevious}
              disabled={isFirstStep || !mergedSettings.behavior.allowBackNavigation}
              className={`inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-semibold rounded-xl transition-all duration-200 ${
                isFirstStep || !mergedSettings.behavior.allowBackNavigation
                  ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                  : 'text-gray-700 hover:bg-gray-50 hover:shadow-md bg-white shadow-sm'
              }`}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Zpět
            </button>

            {isLastStep ? (
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                {mergedSettings.completion.showDownloadPdf && (
                  <button
                    onClick={() => showConsentDialog('pdf')}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-semibold rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Stáhnout PDF
                  </button>
                )}
                {showSubmitButton && (
                  <button
                    onClick={() => showConsentDialog('submit')}
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Odesílám...' : 'Odeslat poptávku'}
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Pokračovat
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </div>

        {/* Modální okno pro souhlas s podmínkami */}
        {showConsentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Souhlas s podmínkami</h3>
                  <button
                    onClick={handleConsentCancel}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {pendingAction === 'pdf' 
                    ? (
                        <>
                          Stažením PDF souhrnu souhlasíte s{' '}
                          <a 
                            href="#" 
                            className="text-blue-600 hover:text-blue-800 underline"
                            onClick={(e) => {
                              e.preventDefault();
                              window.open('#', '_blank');
                            }}
                          >
                            všeobecnými podmínkami
                          </a>
                          {' '}a{' '}
                          <a 
                            href="#" 
                            className="text-blue-600 hover:text-blue-800 underline"
                            onClick={(e) => {
                              e.preventDefault();
                              window.open('#', '_blank');
                            }}
                          >
                            zpracováním osobních údajů
                          </a>
                          .
                        </>
                      )
                    : (
                        <>
                          Odesláním poptávky souhlasíte s{' '}
                          <a 
                            href="#" 
                            className="text-blue-600 hover:text-blue-800 underline"
                            onClick={(e) => {
                              e.preventDefault();
                              window.open('#', '_blank');
                            }}
                          >
                            všeobecnými podmínkami
                          </a>
                          {' '}a{' '}
                          <a 
                            href="#" 
                            className="text-blue-600 hover:text-blue-800 underline"
                            onClick={(e) => {
                              e.preventDefault();
                              window.open('#', '_blank');
                            }}
                          >
                            zpracováním osobních údajů
                          </a>
                          .
                        </>
                      )
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleConsentCancel}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    Zrušit
                  </button>
                  <button
                    onClick={handleConsentConfirm}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
                  >
                    Souhlasím
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {hasValidationErrors && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl border border-red-600 max-w-md mx-auto">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Nejsou vyplněna všechna povinná pole</p>
                  <p className="text-xs text-red-100 mt-1">
                    Prosím vyplňte všechna označená pole před pokračováním
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};