'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';

type Language = 'am' | 'en';

interface Translations {
  [key: string]: {
    en: string;
    am: string;
  };
}

export default function LanguageToggle() {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'am' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 left-4 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
      aria-label={`Switch to ${language === 'en' ? 'Amharic' : 'English'} language`}
    >
      <Globe className="w-5 h-5 text-amber-700 dark:text-amber-500" />
      <span className="font-semibold text-gray-800 dark:text-white">
        {language === 'en' ? 'EN' : 'AM'}
      </span>
    </button>
  );
}