import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'english' | 'hindi' | 'marathi';

type Translations = {
  [key: string]: {
    english: string;
    hindi: string;
    marathi: string;
  };
};

// Common translations used across the app
export const translations: Translations = {
  home: { english: 'Home', hindi: 'होम', marathi: 'मुख्यपृष्ठ' },
  about: { english: 'About', hindi: 'हमारे बारे में', marathi: 'आमच्याबद्दल' },
  // Add other translations here...
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('english');

  // Load saved language preference from localStorage on init
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['english', 'hindi', 'marathi'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Trigger Google Translate to change language
    if (window.google && window.google.translate) {
      const translateSelect = document.querySelector(".goog-te-combo");
      if (translateSelect) {
        const langMap = { english: 'en', hindi: 'hi', marathi: 'mr' };
        translateSelect.value = langMap[language];
        translateSelect.dispatchEvent(new Event("change"));
      }
    }
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations;

    // Navigate through nested keys
    for (const k of keys) {
      if (current[k]) {
        current = current[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // Return the translation or key if not found
    if (current[language]) {
      return current[language];
    } else {
      console.warn(`Translation not available in ${language} for key: ${key}`);
      return current.english || key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};