# Dokumentace projektu průvodců

## Obsah
1. [Úvod](#úvod)
2. [Adresářová struktura](#adresářová-struktura)
3. [Lokální vývoj (Development folder)](#lokální-vývoj)
4. [Nasazení na web (Web folder)](#nasazení-na-web)
5. [Vytváření a úprava průvodců](#vytváření-a-úprava-průvodců)
6. [Přizpůsobení vzhledu a chování](#přizpůsobení-vzhledu-a-chování)
7. [Přidání nové funkcionality](#přidání-nové-funkcionality)
8. [Nejčastější problémy a jejich řešení](#nejčastější-problémy-a-jejich-řešení)

## Úvod

Tento projekt slouží k vytváření, správě a nasazování interaktivních průvodců pro různé oblasti (např. fotovoltaika, klimatizace, tepelná čerpadla). Projekt je navržen jako čistě frontendová aplikace využívající React a TypeScript, stylovaná pomocí Tailwind CSS.

Hlavní cíle projektu:
- **Modularita:** Oddělení jednotlivých průvodců do samostatných modulů
- **Znovupoužitelnost komponent:** Sdílení stejných stavebních bloků mezi průvodci
- **Snadné rozšiřování:** Možnost přidávat nové průvodce pouhým kopírováním a úpravou existujících
- **Jednoduché nasazení:** Možnost sestavit a nasadit každý průvodce samostatně

## Adresářová struktura

Projekt je rozdělen do dvou hlavních částí:

### Development folder (`src/`)
Složka obsahující veškerý zdrojový kód projektu pro vývoj a úpravu průvodců.

```
src/
  ├─ projects/          # Složka pro jednotlivé projekty/průvodce
  │  ├─ vyberfve/       # Průvodce pro výběr FVE
  │  │  ├─ data/        # Definice kroků a nastavení průvodce
  │  │  └─ VyberFveApp.tsx  # Hlavní komponenta FVE průvodce
  │  ├─ vyberklimu/     # Průvodce pro výběr klimatizace
  │  └─ vybertepelko/   # Průvodce pro výběr tepelného čerpadla
  ├─ shared/            # Sdílené komponenty, typy a utility
  │  ├─ components/     # Sdílené React komponenty (např. Wizard, FormField, ProgressBar)
  │  ├─ data/           # Sdílená data (šablony, výchozí nastavení)
  │  ├─ types/          # TypeScript definice typů
  │  └─ utils/          # Pomocné funkce (validace, PDF generátor, email service, apod.)
  ├─ RootApp.tsx        # Hlavní komponenta aplikace (router pro přepínání průvodců)
  └─ main.tsx           # Vstupní bod aplikace
```

### Web folder (`dist/`)
Složka obsahující zkompilované a optimalizované soubory připravené k nasazení na webový server. Tato složka je generována při spuštění příkazu `npm run build`.

```
dist/
  ├─ assets/           # Zkompilované JS, CSS soubory a obrázky
  ├─ index.html        # Hlavní HTML soubor
  └─ ...               # Další vygenerované soubory
```

## Lokální vývoj

### Instalace a spuštění

1. **Požadavky**
   - Node.js 16+ (doporučeno 18+)
   - npm 7+ nebo Yarn 1.22+

2. **Instalace závislostí**
   ```bash
   npm install
   ```

3. **Spuštění vývojového serveru**
   ```bash
   npm run dev
   ```
   
   Po spuštění bude aplikace dostupná na adrese [http://localhost:5173](http://localhost:5173) (nebo jiném portu, který Vite vybere, pokud 5173 není dostupný).

4. **Hot Reloading**  
   Vývojový server automaticky aktualizuje aplikaci při změně zdrojových souborů, bez nutnosti manuálního obnovení stránky.

### Přepínání mezi průvodci během vývoje

V režimu vývoje jsou dostupné všechny průvodce prostřednictvím hlavní nabídky (`RootApp.tsx`). Můžete mezi nimi přepínat buď:

1. Pomocí grafického rozhraní, kliknutím na tlačítko "Spustit průvodce" u příslušného průvodce
2. Přidáním URL parametru `?wizard=nazev-pruvodce`, například:
   - `http://localhost:5173/?wizard=vyberfve`
   - `http://localhost:5173/?wizard=vyberklimu`
   - `http://localhost:5173/?wizard=vybertepelko`

3. Úpravou souboru `src/RootApp.tsx` - dočasnou změnou kódu pro automatické zobrazení konkrétního průvodce (například zakomentováním podmíněných bloků a vrácením pouze konkrétní komponenty průvodce).

## Nasazení na web

### Build procesu

Pro vytvoření balíčku připraveného k nasazení na webový server postupujte následovně:

1. **Příprava pro build konkrétního průvodce**
   
   Otevřete soubor `src/RootApp.tsx` a upravte ho tak, aby zobrazoval pouze průvodce, který chcete nasadit. Například pro FVE průvodce:
   
   ```typescript
   // src/RootApp.tsx
   import React from 'react';
   import VyberFveApp from './projects/vyberfve/VyberFveApp';
   
   const RootApp: React.FC = () => {
     return <VyberFveApp />;
   };
   
   export default RootApp;
   ```

2. **Spuštění buildu**
   ```bash
   npm run build
   ```

3. **Výsledek**
   
   V adresáři `dist/` budou vygenerovány všechny potřebné soubory. Tento adresář obsahuje kompletní statickou webovou stránku s průvodcem.

### Nasazení na webový server

Obsah adresáře `dist/` můžete nahrát na libovolný webový server, který podporuje statické soubory:

1. **Tradiční hosting:**
   - Nahrajte veškerý obsah složky `dist/` do kořenového adresáře vašeho webového serveru pomocí FTP nebo jiného nástroje.
   - Ujistěte se, že je zachována struktura souborů.

2. **Netlify:**
   - Přidejte projekt do Netlify a nastavte build příkaz na `npm run build` a cílový adresář na `dist`.
   - Netlify automaticky sestaví a nasadí váš projekt.

3. **Vercel:**
   - Podobně jako u Netlify, přidejte projekt do Vercel a framework nastavte na Vite.

4. **GitHub Pages:**
   - Můžete použít nástroj jako `gh-pages` pro nasazení složky `dist/` na GitHub Pages.

### Důležitá poznámka o routování

Vzhledem k tomu, že aplikace nepoužívá server-side rendering ani API volání, funguje jako plně statická stránka. To znamená, že ji můžete hostovat na jakémkoliv statickém hostingu bez nutnosti speciálního nastavení serveru.

Pokud byste v budoucnu přidali klientské routování (například pomocí React Router), bude potřeba nakonfigurovat server tak, aby vždy servíroval `index.html` a nechal routování na klientské aplikaci.

## Vytváření a úprava průvodců

### Struktura průvodce

Každý průvodce je samostatný "projekt" v adresáři `src/projects/`. Skládá se z následujících částí:

1. **Data průvodce** (`data/nazevWizard.ts`):
   - Definice kroků průvodce
   - Pole formulářů a jejich validace
   - Vizuální a funkční nastavení

2. **Aplikační komponenta** (`NazevApp.tsx`):
   - React komponenta, která renderuje buď průvodce, nebo úvodní stránku

### Úprava existujícího průvodce

Pro úpravu stávajícího průvodce postupujte takto:

1. **Úprava obsahu průvodce:**
   
   Otevřete soubor s daty průvodce, např. `src/projects/vyberfve/data/vyberfveWizard.ts`. Zde můžete upravit:
   
   - **Kroky průvodce:** Přidávat, upravovat nebo mazat kroky
   - **Pole:** Měnit formulářové prvky v rámci kroků
   - **Validace:** Upravit pravidla pro validaci vstupních dat
   - **Nastavení:** Změnit vzhled, barvy, chování průvodce
   
   ```typescript
   // Příklad úpravy existujícího kroku
   {
     id: 'registration',
     title: 'Kontaktní údaje', // Zde můžete změnit nadpis
     description: 'Vyplňte své kontaktní údaje pro pokračování', // Zde můžete změnit popis
     // ...
     fields: [
       // Zde můžete přidat nebo upravit formulářová pole
     ]
   }
   ```

2. **Úprava vzhledu úvodní stránky:**
   
   Otevřete soubor s aplikační komponentou, např. `src/projects/vyberfve/VyberFveApp.tsx`. Zde můžete upravit:
   
   - Obsah a vzhled úvodní stránky (texty, barvy, obrázky)
   - Rozložení sekcí a bloků
   - Doprovodné texty a vysvětlení

### Vytvoření nového průvodce

Pro vytvoření nového průvodce doporučujeme zkopírovat a upravit existující:

1. **Vytvoření nové složky:**
   
   Vytvořte novou složku ve `src/projects/`, např. `src/projects/novyprůvodce/`.

2. **Kopírování a úprava souborů:**
   
   - Zkopírujte soubory z existujícího průvodce (např. `vyberfve`) do nové složky.
   - Přejmenujte soubory podle nového průvodce (např. `novypruvodceWizard.ts`, `NovyPruvodceApp.tsx`).
   - Upravte obsah souborů - změňte ID, názvy, kroky a nastavení podle vašich potřeb.

3. **Registrace průvodce v RootApp:**
   
   Přidejte nový průvodce do `src/RootApp.tsx`:
   
   ```typescript
   import NovyPruvodceApp from './projects/novypruvodce/NovyPruvodceApp';
   
   // ... v komponentě RootApp:
   if (activeWizard === 'novypruvodce') {
     return <NovyPruvodceApp />;
   }
   
   // ... přidat do menu:
   <button onClick={() => changeWizard('novypruvodce')}>
     Spustit nový průvodce
   </button>
   ```

4. **Testování:**
   
   Otestujte nový průvodce v prohlížeči a zkontrolujte, zda všechny kroky a pole fungují správně.

### Vytvoření nového průvodce od základu

Pokud chcete vytvořit zcela nový průvodce s vlastní strukturou:

1. **Vytvoření struktury:**
   
   Vytvořte základní adresářovou strukturu ve `src/projects/novypruvodce/`:
   
   ```
   src/projects/novypruvodce/
     ├─ data/
     │  └─ novypruvodceWizard.ts
     └─ NovyPruvodceApp.tsx
   ```

2. **Vytvoření dat průvodce:**
   
   V souboru `novypruvodceWizard.ts` použijte šablonu z `src/shared/data/wizardTemplates.ts` a upravte ji podle svých potřeb.

3. **Vytvoření aplikační komponenty:**
   
   V souboru `NovyPruvodceApp.tsx` vytvořte React komponentu, která bude buď zobrazovat úvodní stránku, nebo průvodce.

4. **Registrace v RootApp:**
   
   Přidejte nový průvodce do `src/RootApp.tsx` stejným způsobem jako u kopírovaného průvodce.

## Přizpůsobení vzhledu a chování

### Vzhled průvodce

Každý průvodce má své vlastní nastavení vzhledu a chování v objektu `settings` v souboru s daty průvodce:

```typescript
settings: {
  theme: {
    primaryColor: '#374151', // Hlavní barva (tlačítka, zvýraznění)
    secondaryColor: '#6B7280', // Sekundární barva
    accentColor: '#3B82F6', // Zvýrazňující barva
    backgroundColor: '#FFFFFF', // Barva pozadí
    textColor: '#111827', // Barva textu
    fontFamily: 'Inter', // Použité písmo
    borderRadius: '12px', // Zaoblení rohů prvků
    shadows: true, // Povolení stínů
    animations: true, // Povolení animací
    gradientBackground: true, // Použití gradientního pozadí
    gradientDirection: 'to-br', // Směr gradientu
    gradientColors: ['#f8fafc', '#ffffff', '#f1f5f9'], // Barvy gradientu
  },
  behavior: {
    showProgressBar: true, // Zobrazit progress bar
    progressBarStyle: 'steps', // Styl progress baru (steps, bar, circle, minimal)
    allowBackNavigation: true, // Povolit navigaci zpět
    allowSkipSteps: false, // Povolit přeskakování kroků
    autoSave: true, // Automatické ukládání dat
    requireEmail: true, // Vyžadovat e-mail
    showBranding: false, // Zobrazit branding
    stepTransition: 'slide', // Efekt přechodu mezi kroky
  },
  // Další nastavení...
}
```

Úpravou těchto hodnot můžete snadno změnit vzhled průvodce bez nutnosti zasahovat do kódu komponent.

### Styly pomocí Tailwind CSS

Projekt používá [Tailwind CSS](https://tailwindcss.com/) pro stylování. Většina vizuálních aspektů je definována přímo v komponentách pomocí Tailwind tříd.

Pokud potřebujete upravit styl konkrétní komponenty, najděte ji v `src/shared/components/` a upravte její třídy Tailwind. Například:

```tsx
<div className="bg-white rounded-2xl shadow-xl p-8"> {/* Zde můžete upravit třídy */}
  {/* Obsah komponenty */}
</div>
```

### Globální styly

Globální styly jsou definovány v souboru `src/index.css`. Tento soubor obsahuje:

1. Importy Tailwind CSS
2. Vlastní CSS proměnné a styly

Pokud potřebujete přidat globální styly, které se budou aplikovat na celou aplikaci, přidejte je do tohoto souboru.

## Přidání nové funkcionality

### Přidání nového typu formulářového pole

Pokud potřebujete přidat nový typ formulářového pole, postupujte takto:

1. **Aktualizace typů:**
   
   V souboru `src/shared/types/wizard.ts` přidejte nový typ do `FormField`:
   
   ```typescript
   type: 'text' | 'textarea' | /* existující typy */ | 'vas-novy-typ';
   ```

2. **Implementace renderování:**
   
   V souboru `src/shared/components/FormField.tsx` přidejte logiku pro renderování nového typu pole do funkce `renderField`.
   
   **Příklad:** Pole `roofArea` s `enableAreaCalculation` v `src/projects/vyberfve/data/vyberfveWizard.ts` využívá speciální kalkulačku plochy střechy, která je implementována přímo v `FormField.tsx`. Pokud přidáváte podobnou komplexní funkcionalitu, je potřeba ji implementovat v `FormField.tsx` a případně přidat nové vlastnosti do `FormField` typu.

   ```typescript
   case 'vas-novy-typ':
     return (
       <div className="...">
         {/* Vaše implementace nového typu pole */}
       </div>
     );
   ```

3. **Přidání validace:**
   
   V souboru `src/shared/utils/validation.ts` přidejte validační logiku pro nový typ pole.

### Přidání nové sdílené komponenty

Pokud potřebujete vytvořit novou sdílenou komponentu:

1. **Vytvoření souboru:**
   
   Vytvořte nový soubor v `src/shared/components/`, např. `NewComponent.tsx`.

2. **Implementace komponenty:**
   
   ```tsx
   import React from 'react';
   
   interface NewComponentProps {
     // definice props
   }
   
   export const NewComponent: React.FC<NewComponentProps> = (props) => {
     return (
       <div>
         {/* Vaše implementace */}
       </div>
     );
   };
   ```

3. **Použití komponenty:**
   
   Importujte a použijte komponentu v průvodcích nebo jiných komponentách:
   
   ```tsx
   import { NewComponent } from '../../shared/components/NewComponent';
   
   // ...
   
   <NewComponent {...props} />
   ```

## Nejčastější problémy a jejich řešení

### Problém: Změny se neprojevují v prohlížeči

**Řešení:**
- Zkontrolujte, zda běží vývojový server (`npm run dev`)
- Vymažte cache prohlížeče (Ctrl+F5)
- Zkontrolujte konzoli prohlížeče pro případné chyby

### Problém: Chyby při sestavení

**Řešení:**
- Zkontrolujte chybové hlášení v terminálu
- Ověřte, že všechny importy odkazují na správná umístění souborů (zejména dbejte na to, aby všechny sdílené utility byly importovány z `src/shared/utils/` a ne z `src/utils/`)
- Ověřte syntax TypeScript souborů

### Problém: Nefunguje validace formuláře

**Řešení:**
- Zkontrolujte definici pole v datech průvodce
- Ověřte, že validační pravidla jsou správně nastavena
- Přidejte `console.log` do validační funkce pro odhalení problému

### Problém: PDF generátor negeneruje správně PDF

**Řešení:**
- Zkontrolujte data formuláře pomocí `console.log(formData)`
- Ověřte, že jsPDF knihovna je správně inicializována
- Zkontrolujte, že všechny hodnoty předávané do PDF jsou definovány a mají správný formát
- **Poznámka:** Ujistěte se, že `pdfLogoUrl` v nastavení průvodce (`settings.completion.pdfLogoUrl`) odkazuje na platnou a dostupnou URL obrázku. Také zkontrolujte kontaktní údaje v patičce PDF v `src/shared/utils/pdfGenerator.ts`, které jsou v současné době pevně zakódované.

### Problém: E-mailové notifikace nefungují

**Řešení:**
- Zkontrolujte konfiguraci EmailJS v `src/shared/utils/emailService.ts`. Ujistěte se, že `EMAILJS_PUBLIC_KEY`, `YOUR_SERVICE_ID` a `YOUR_TEMPLATE_ID` jsou správně nastaveny a odpovídají vašemu účtu EmailJS.
- Ověřte, že `to_email` v `emailData` je nastaven na správnou e-mailovou adresu, kam mají být poptávky odesílány.
- Zkontrolujte konzoli prohlížeče pro případné chyby související s odesíláním e-mailů.