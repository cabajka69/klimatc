import React from 'react';
import { Check } from 'lucide-react';
import * as Icons from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  stepIcons?: string[];
  onStepClick?: (stepIndex: number) => void;
  completedSteps?: number[];
  primaryColor?: string;
  secondaryColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps, 
  stepTitles, 
  stepIcons = [],
  onStepClick,
  completedSteps = [],
  primaryColor = '#3B82F6',
  secondaryColor = '#6B7280'
}) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  // Pomocná funkce pro získání ikony podle názvu
  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
  };

  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-8 shadow-inner">
        <div
          className="h-3 rounded-full transition-all duration-700 ease-out shadow-sm relative overflow-hidden"
          style={{ 
            width: `${progressPercentage}%`,
            background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between items-start">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.includes(stepNumber) || stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const stepIcon = stepIcons[index];
          const isClickable = onStepClick !== undefined;
          
          return (
            <div key={index} className="flex flex-col items-center max-w-32 text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-lg relative ${
                  isCompleted
                    ? 'text-white shadow-green-200'
                    : isCurrent
                    ? 'text-white ring-4 ring-opacity-30 shadow-blue-200 scale-110'
                    : 'bg-white text-gray-400 border-2 border-gray-200 shadow-gray-100'
                } ${isClickable ? 'cursor-pointer hover:scale-105' : ''}`}
                style={{
                  backgroundColor: isCompleted ? '#10B981' : isCurrent ? primaryColor : undefined,
                  ringColor: isCurrent ? `${primaryColor}40` : undefined
                }}
                onClick={() => isClickable && onStepClick(index)}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : isCurrent && stepIcon ? (
                  getIcon(stepIcon)
                ) : (
                  stepNumber
                )}
                
                {isCurrent && (
                  <div 
                    className="absolute inset-0 rounded-full opacity-75 animate-ping"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                )}
              </div>
              
              <span
                className={`text-xs mt-3 leading-tight font-medium transition-all duration-300 ${
                  isCurrent 
                    ? 'font-bold' 
                    : isCompleted 
                    ? 'text-green-600 font-semibold' 
                    : 'text-gray-500'
                } ${isClickable ? 'cursor-pointer hover:text-blue-700' : ''}`}
                style={{ color: isCurrent ? primaryColor : undefined }}
                onClick={() => isClickable && onStepClick(index)}
              >
                {title}
              </span>
              
              {isCurrent && (
                <div 
                  className="mt-1 w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: primaryColor }}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress text */}
      <div className="text-center mt-6">
        <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: primaryColor }}
          ></div>
          <span className="text-sm font-medium text-gray-700">
            Krok {currentStep} z {totalSteps}
          </span>
          <span className="text-xs text-gray-500">•</span>
          <span 
            className="text-sm font-bold"
            style={{ color: primaryColor }}
          >
            {Math.round(progressPercentage)}% dokončeno
          </span>
        </div>
      </div>
    </div>
  );
};