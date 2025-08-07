# Dokumentace sdílených komponent a utilit

## Obsah
1. [Komponenty](#komponenty)
2. [Typy](#typy)
3. [Utility](#utility)
4. [Data](#data)
5. [Změny a aktualizace](#změny-a-aktualizace)

## Komponenty

### Wizard.tsx

**Účel:** Hlavní komponenta průvodce, která zpracovává kroky, navigaci, validaci a odesílání formuláře.

**Použití:**
```tsx
import { Wizard } from '../../shared/components/Wizard';
import { mojePruvodceData } from './data/mojePruvodceData';

// V komponentě:
<Wizard 
  steps={mojePruvodceData.steps} 
  settings={mojePruvodceData.settings}
  onComplete={(data) => console.log('Dokončeno:', data)}
  onBack={() => setShowWizard(false)}
/>
```

**Props:**
- `steps`: Pole objektů typu `WizardStep` definující jednotlivé kroky průvodce
- `settings`: Objekt typu `WizardSettings` s nastavením vzhledu a chování
- `onComplete`: Callback funkce, která se zavolá při dokončení průvodce
- `onBack`: Callback funkce pro návrat z průvodce (např. na úvodní stránku)

**Možnosti úprav:**
- Přizpůsobení zobrazení dokončovací obrazovky v části s podmínkou `if (isCompleted)`
- Úprava logiky navigace mezi kroky v funkcích `handleNext`, `handlePrevious`
- Změna logiky validace v `validateCurrentStep`

**Důležité poznámky:**
- Komponenta obsahuje vlastní vnitřní stav pro formulářová data a chyby
- Při přidávání nových funkcí dbejte na zachování kompatibility s existujícími průvodci

### ProgressBar.tsx

**Účel:** Zobrazuje průběh průvodce jako progress bar nebo série kroků.

**Použití:**
```tsx
import { ProgressBar } from '../../shared/components/ProgressBar';

// V komponentě:
<ProgressBar
  currentStep={2}
  totalSteps={5}
  stepTitles={['Krok 1', 'Krok 2', 'Krok 3', 'Krok 4', 'Krok 5']}
  stepIcons={['User', 'Home', 'Settings', 'FileText', 'CheckCircle']}
  onStepClick={(stepIndex) => console.log('Kliknuto na krok:', stepIndex)}
  completedSteps={[1]}
  primaryColor="#3B82F6"
  secondaryColor="#6B7280"
/>
```

**Props:**
- `currentStep`: Číslo aktuálního kroku (začíná od 1)
- `totalSteps`: Celkový počet kroků
- `stepTitles`: Pole názvů jednotlivých kroků
- `stepIcons`: Pole názvů ikon pro jednotlivé kroky (používá Lucide React ikony)
- `onStepClick`: Callback funkce pro klik na krok (volitelné, pokud není zadáno, kroky nejsou klikatelné)
- `completedSteps`: Pole čísel dokončených kroků
- `primaryColor`: Primární barva progress baru
- `secondaryColor`: Sekundární barva progress baru

**Možnosti úprav:**
- Změna stylu progress baru
- Přidání nových typů zobrazení průběhu

**Důležité poznámky:**
- Komponenta je responzivní a přizpůsobuje se různým velikostem obrazovky
- Používá Lucide React ikony, ujistěte se, že je tato knihovna v projektu nainstalována

### StepContent.tsx

**Účel:** Zobrazuje obsah aktuálního kroku průvodce včetně formulářových polí.

**Použití:**
```tsx
import { StepContent } from '../../shared/components/StepContent';

// V komponentě:
<StepContent
  step={currentStep}
  formData={formData}
  onFieldChange={handleFieldChange}
  errors={errors}
  device={device}
/>
```

**Props:**
- `step`: Objekt typu `WizardStep` obsahující informace o aktuálním kroku
- `formData`: Objekt s aktuálními daty formuláře
- `onFieldChange`: Callback funkce pro změnu hodnoty pole
- `errors`: Pole validačních chyb
- `device`: Typ zařízení ('desktop', 'tablet', 'mobile') pro responzivní zobrazení

**Možnosti úprav:**
- Úprava rozložení polí v kroku
- Přidání nových typů zobrazení pro speciální kroky

**Důležité poznámky:**
- Komponenta podporuje speciální zobrazení pro krok s ID 'summary'
- Dynamicky zobrazuje pole na základě podmínek definovaných v datech kroku

### FormField.tsx

**Účel:** Renderuje jednotlivé typy formulářových polí na základě jejich definice.

**Použití:**
```tsx
import { FormField } from '../../shared/components/FormField';

// V komponentě:
<FormField
  field={fieldDefinition}
  value={fieldValue}
  onChange={(newValue) => handleChange(fieldId, newValue)}
  error={fieldError}
  formData={allFormData}
  device={device}
/>
```

**Props:**
- `field`: Objekt typu `FormField` definující vlastnosti pole
- `value`: Aktuální hodnota pole
- `onChange`: Callback funkce pro změnu hodnoty
- `error`: Objekt typu `ValidationError` obsahující případnou chybu
- `formData`: Objekt s kompletními daty formuláře (pro podmíněnou logiku)
- `device`: Typ zařízení ('desktop', 'tablet', 'mobile')

**Podporované typy polí:**
- `text`: Jednořádkové textové pole
- `textarea`: Víceřádkové textové pole
- `select`: Rozbalovací seznam
- `multiselect`: Vícenásobný výběr
- `radio`: Přepínač (radio buttons)
- `checkbox`: Zaškrtávací pole
- `number`: Číselné pole
- `email`: Pole pro e-mailovou adresu
- `phone`: Pole pro telefonní číslo
- `date`: Pole pro datum
- `file`: Nahrávání souborů
- `autocomplete`: Pole s automatickým doplňováním
- `slider`: Posuvník
- `note`: Informační poznámka (bez vstupu)

**Možnosti úprav:**
- Přidání nových typů polí
- Vylepšení stávajících typů polí
- Úprava stylování polí

**Důležité poznámky:**
- Každý typ pole má vlastní logiku renderování a zpracování změn
- Komponenta podporuje podmíněné zobrazení polí na základě jiných hodnot formuláře
- Některé typy polí mají speciální funkce (např. kalkulačka plochy střechy u pole `roofArea`)

## Typy

### wizard.ts

**Účel:** Definuje TypeScript typy a rozhraní pro průvodce, kroky, formulářová pole a související datové struktury.

**Hlavní typy:**
- `FormField`: Definice formulářového pole včetně typu, validace, podmínek atd.
- `WizardStep`: Definice kroku průvodce včetně polí a skupin
- `FormData`: Typ pro data formuláře
- `ValidationError`: Typ pro chyby validace
- `WizardSettings`: Nastavení vzhledu a chování průvodce
- `Wizard`: Kompletní definice průvodce

**Použití:**
```typescript
import { Wizard, WizardStep, FormField } from '../../shared/types/wizard';

// Definice průvodce
export const mojePruvodce: Wizard = {
  id: 'muj-pruvodce',
  name: 'Můj průvodce',
  description: 'Popis průvodce',
  category: 'Kategorie',
  steps: [/* kroky */],
  settings: {/* nastavení */}
};
```

**Možnosti úprav:**
- Rozšíření existujících typů o nové vlastnosti
- Přidání nových typů polí do `FormField.type`
- Přidání nových validačních pravidel

**Důležité poznámky:**
- Při změně nebo přidání nových typů polí je potřeba aktualizovat také komponentu `FormField` pro jejich správné zobrazení
- Tyto typy jsou základem celé aplikace a měly by být upravovány s opatrností

## Utility

### validation.ts

**Účel:** Poskytuje funkce pro validaci formulářových polí a celých kroků průvodce.

**Hlavní funkce:**
- `validateField`: Validuje jednotlivé pole na základě jeho typu a validačních pravidel
- `validateStep`: Validuje celý krok průvodce a vrací pole chyb

**Použití:**
```typescript
import { validateField, validateStep } from '../../shared/utils/validation';

// Validace jednoho pole
const error = validateField(fieldDefinition, fieldValue);

// Validace celého kroku
const errors = validateStep(stepDefinition, formData);
```

**Možnosti úprav:**
- Přidání validace pro nové typy polí
- Rozšíření validačních pravidel
- Přidání složitější validační logiky (např. vzájemná závislost polí)

**Důležité poznámky:**
- Validace probíhá jak při přechodu mezi kroky, tak při změně hodnoty pole
- Chybové zprávy jsou zobrazovány pod příslušnými poli

### pdfGenerator.ts

**Účel:** Generuje PDF souhrn vyplněných dat z průvodce.

**Hlavní funkce:**
- `generatePDF`: Vytváří PDF soubor z dat formuláře a definice kroků průvodce

**Použití:**
```typescript
import { generatePDF } from '../../shared/utils/pdfGenerator';

// Generování PDF
generatePDF(formData, wizardSteps, pdfSettings);
```

**Možnosti úprav:**
- Přizpůsobení vzhledu PDF
- Přidání nových sekcí do PDF
- Úprava formátování hodnot

**Důležité poznámky:**
- PDF generátor používá knihovnu jsPDF
- Generované PDF je staženo do zařízení uživatele

### emailService.ts

**Účel:** Odesílá e-mailové notifikace s daty z průvodce.

**Hlavní funkce:**
- `sendEmail`: Odesílá e-mail s daty formuláře

**Použití:**
```typescript
import { sendEmail } from '../../shared/utils/emailService';

// Odeslání e-mailu
await sendEmail(formData);
```

**Možnosti úprav:**
- Konfigurace e-mailové služby (EmailJS)
- Úprava formátu a obsahu e-mailu
- Přidání nových příjemců

**Důležité poznámky:**
- Ve výchozím nastavení používá EmailJS pro odesílání e-mailů z klientské strany
- Pro produkční použití je nutné nakonfigurovat vlastní EmailJS účet a šablony

### utility.ts

**Účel:** Obsahuje pomocné utility funkce používané v celé aplikaci.

**Hlavní funkce:**
- `slugify`: Převádí text na URL-friendly řetězec
- `generateFieldId`: Generuje ID pole na základě jeho popisku

**Použití:**
```typescript
import { slugify, generateFieldId } from '../../shared/utils/utility';

// Převod textu na slug
const slug = slugify('Nějaký název s diakritikou');

// Generování ID pole
const fieldId = generateFieldId('Název pole');
```

**Možnosti úprav:**
- Přidání nových užitečných funkcí

**Důležité poznámky:**
- Funkce jsou navrženy tak, aby byly nezávislé a snadno testovatelné

## Data

### wizardTemplates.ts

**Účel:** Poskytuje výchozí šablony a nastavení pro vytváření nových průvodců.

**Obsah:**
- `defaultWizardSteps`: Pole výchozích kroků, které lze použít jako základ pro nový průvodce
- `defaultWizardSettings`: Výchozí nastavení pro nový průvodce
- `createWizardTemplate`: Funkce pro vytvoření nové šablony průvodce

**Použití:**
```typescript
import { createWizardTemplate, defaultWizardSteps } from '../../shared/data/wizardTemplates';

// Vytvoření nové šablony průvodce
const newWizard = createWizardTemplate('Název průvodce', 'Kategorie');

// Nebo použití výchozích kroků a vlastní úprava
const customWizard = {
  id: 'custom-wizard',
  name: 'Vlastní průvodce',
  description: 'Popis průvodce',
  category: 'Moje kategorie',
  steps: [...defaultWizardSteps], // Kopie výchozích kroků
  // ... vlastní nastavení
};
```

**Možnosti úprav:**
- Přidání nových typů šablon pro různé scénáře
- Úprava výchozích kroků a nastavení

**Důležité poznámky:**
- Šablony slouží jako výchozí bod pro vytváření nových průvodců
- Je vždy lepší upravit existující šablonu než vytvářet průvodce od nuly
## Změny a aktualizace

### Verze 2.1.0 - Vylepšení FVE průvodce a PDF generování

#### Nové funkce:
1. **Podmíněná logika pro klimatizaci v bytových domech**
   - Přidáno pole `acInstallationType` pro specifikaci typu instalace klimatizace
   - Zobrazuje se pouze pro bytové domy s klimatizací
   - Možnosti: "Pouze společné prostory", "Každá bytová jednotka", "Řešeno individuálně"

2. **Optimalizace pro průmyslové/komerční objekty**
   - Skrytí pole "Typ plánovaného elektromobilu" pro průmyslové, komerční objekty a bytové domy
   - Zjednodušení workflow pro tyto typy nemovitostí

3. **Vylepšené PDF generování**
   - Nahrazení emoji ikon za Unicode symboly pro lepší kompatibilitu
   - Vylepšené formátování multiselect polí s odrážkami a zalomením řádků
   - Optimalizované rozložení obsahu pro lepší čitelnost
   - Dynamické přizpůsobení šířky polí
   - Lepší zpracování prázdných polí

#### Technické změny:
- **FormField komponenta**: Zachována stávající funkcionalita s přidanou podporou nových podmíněných polí
- **PDF generátor**: Vylepšené CSS pro lepší zalomení stránek a čitelnost
- **Utility funkce**: Přidáno mapování pro nové typy polí
- **Validace**: Zachována stávající logika validace s podporou nových polí

#### Migrace:
- Žádné breaking changes
- Stávající formulářová data zůstávají kompatibilní
- Nová pole jsou volitelná a nezobrazují se pokud nejsou splněny podmínky

#### Verze 2.2.0 - Vylepšení podmíněné logiky a PDF generování

#### Nové funkce:
1. **Podmíněná otázka pro instalaci klimatizace v bytových domech**
   - Přidáno pole `acInstallationType` pro specifikaci typu instalace klimatizace
   - Zobrazuje se pouze pro bytové domy s vybranou klimatizací
   - Možnosti: "Pouze společné prostory", "Každá bytová jednotka", "Řešeno individuálně"

2. **Optimalizace pro průmyslové a komerční objekty**
   - Skrytí pole "Typ plánovaného elektromobilu" pro průmyslové, komerční objekty a bytové domy
   - Pole se nyní zobrazuje pouze pro rodinné domy
   - Zjednodušení workflow pro B2B klienty

3. **Vylepšené PDF generování**
   - Nahrazení emoji ikon za Unicode symboly pro lepší kompatibilitu
   - Vylepšené formátování multiselect polí s odrážkami a zalomením řádků
   - Dynamické CSS rozložení pro lepší přizpůsobení obsahu
   - Vylepšená kontrola prázdných polí
   - Optimalizované zalomení stránek

#### Technické změny:
- **Podmíněná logika**: Rozšířena podpora pro komplexní AND podmínky
- **PDF generátor**: 
  - Změna z grid na flex layout pro field-row
  - Vylepšené CSS pro responzivní zobrazení
  - Lepší formátování multiselect s `<br/>` separátory
- **Validace**: Vylepšená funkce `hasValue()` pro přesnější detekci prázdných polí
- **Utility funkce**: Přidáno mapování pro `acInstallationType`

#### Konfigurace nového pole:
```typescript
{
  id: 'acInstallationType',
  type: 'radio',
  conditional: {
    dependsOn: 'currentAppliances',
    values: ['air-conditioning'],
    and: [{ dependsOn: 'propertyType', values: ['apartment-building'] }]
  }
}
```
- Stávající formulářová data zůstávají kompatibilní
- Nová pole jsou volitelná a nezobrazují se pokud nejsou splněny podmínky

#### Konfigurace průvodce:
```typescript
// Nové pole pro typ instalace klimatizace
{
  id: 'acInstallationType',
  type: 'radio',
  label: 'Typ instalace klimatizace',
  required: true,
  conditional: {
    dependsOn: 'currentAppliances',
    values: ['air-conditioning'],
    and: [{
      dependsOn: 'propertyType',
      values: ['apartment-building']
    }]
  },
  options: [
    { value: 'common-areas', label: 'Pouze společné prostory' },
    { value: 'each-unit', label: 'Každá bytová jednotka' },
    { value: 'individual', label: 'Řešeno individuálně' }
  ]
}
```

#### Hlavní systémové funkce:

**1. Průvodce (Wizard.tsx)**
- **Účel**: Hlavní komponenta pro řízení průtoku formuláře
- **Funkce**: 
  - Navigace mezi kroky
  - Validace dat
  - Podmíněné zobrazování kroků a polí
  - Auto-save funkcionalita
  - PDF generování a e-mail odesílání

**2. Podmíněná logika**
- **Systém**: Hierarchické podmínky s AND/OR operátory
- **Použití**: Dynamické zobrazování polí na základě předchozích odpovědí
- **Příklad**: Klimatizace v bytových domech se zobrazí pouze pokud je vybrán bytový dům A klimatizace

**3. PDF generování**
- **Engine**: html2pdf.js pro převod HTML na PDF
- **Funkce**:
  - Dynamické formátování na základě obsahu
  - Správa zalomení stránek
  - Optimalizované rozložení pro různé délky obsahu
  - ZIP archiv s přílohami pokud existují

**4. Validace**
- **Typy**: Povolené hodnoty, regex pattern, rozsah čísel
- **Chování**: Real-time validace při změně hodnot
- **Zobrazení**: Inline chybové zprávy pod poli

**5. Responsivní design**
- **Breakpoints**: Mobile (< 640px), Tablet (640-1024px), Desktop (> 1024px)
- **Adaptace**: Automatické přizpůsobení rozložení polí a navigace

#### Vedlejší funkce:

**1. Auto-complete pro adresy**
- **Poskytovatel**: OpenStreetMap Nominatim API
- **Funkce**: Dynamické vyhledávání adres při psaní

**2. Kalkulačka plochy střechy**
- **Vstup**: Šířka, délka budovy, sklon střechy
- **Výstup**: Automatický výpočet plochy střechy pro FVE

**3. Slider komponenta**
- **Použití**: Nastavení úhlů, výkonů, kapacit
- **Funkce**: Vizuální posuvník s přednastavenými značkami

**4. File upload s drag & drop**
- **Podporované formáty**: JPG, PNG, PDF, DOC
- **Funkce**: Náhled souborů, odstranění, validace velikosti

**5. Pokročilé multiselect**
- **Filtrování**: Dynamické skrývání/zobrazování možností
- **Závislosti**: Komplexní podmínky založené na více polích

#### Postup použití:

1. **Inicializace průvodce**
   ```typescript
   <Wizard 
     steps={vyberfveWizard.steps} 
     settings={vyberfveWizard.settings}
     onComplete={(data) => handleComplete(data)}
   />
   ```

2. **Definice kroků**
   - Každý krok obsahuje pole seskupená do logických celků
   - Podmíněná logika určuje viditelnost polí
   - Validační pravidla zajišťují kvalitu dat

3. **Zpracování dat**
   - Automatické ukládání průběhu
   - Validace při přechodu mezi kroky
   - Generování PDF souhrnu
   - Odeslání e-mailu s poptávkou

4. **Customizace**
   - Úprava kroků v datovém souboru
   - Přizpůsobení vzhledu přes nastavení
   - Rozšíření o nové typy polí

#### Bezpečnost a výkon:
- **Validace**: Client-side i server-side validace dat
- **Sanitizace**: Čištění vstupních dat před zpracováním
- **Optimalizace**: Lazy loading komponent, memoizace výpočtů
- **Chyby**: Graceful error handling s user-friendly zprávami