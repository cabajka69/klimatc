import { FormField, ValidationError, WizardStep, FormData, OptionConditional } from '../types/wizard';
import { evaluateConditional } from './utility';

export const validateField = (field: FormField, value: any): ValidationError | null => {
  // Check required fields
  if (field.required && (!value || (Array.isArray(value) && value.length === 0) || value === '')) {
    return {
      field: field.id,
      message: `${field.label} je povinné pole`
    };
  }

  // Skip validation if field is empty and not required
  if (!value || value === '') {
    return null;
  }

  // Type-specific validation
  switch (field.type) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return {
          field: field.id,
          message: 'Zadejte platnou e-mailovou adresu'
        };
      }
      break;

    case 'phone':
      const phoneRegex = /^(\+420)?\s*[0-9]{3}\s*[0-9]{3}\s*[0-9]{3}$/;
      if (!phoneRegex.test(value)) {
        return {
          field: field.id,
          message: 'Zadejte platné telefonní číslo (např. +420 777 777 777)'
        };
      }
      break;

    case 'number':
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return {
          field: field.id,
          message: 'Hodnota musí být číslo'
        };
      }
      
      if (field.validation?.min !== undefined && numValue < field.validation.min) {
        return {
          field: field.id,
          message: `Minimální hodnota je ${field.validation.min}`
        };
      }
      
      if (field.validation?.max !== undefined && numValue > field.validation.max) {
        return {
          field: field.id,
          message: `Maximální hodnota je ${field.validation.max}`
        };
      }
      break;

    case 'text':
    case 'textarea':
      if (field.validation?.pattern) {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(value)) {
          return {
            field: field.id,
            message: field.validation.message || 'Neplatný formát'
          };
        }
      }
      break;
  }

  return null;
};

export const validateStep = (step: WizardStep, formData: FormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  const shouldShowField = (field: FormField) => {
    if (!field.conditional) return true;
    return evaluateConditional(field.conditional, formData);
  };

  const visibleFields = step.fields.filter(shouldShowField);

  for (const field of visibleFields) {
    const error = validateField(field, formData[field.id]);
    if (error) {
      errors.push(error);
    }
  }

  return errors;
};