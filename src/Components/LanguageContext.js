import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native'; // Certifique-se de que você tem o AsyncStorage instalado

// Textos em diferentes idiomas
const translations = {
  pt: {
    appTheme: 'Tema do App',
    lightTheme: 'Tema Claro',
    darkTheme: 'Tema Escuro',
    fontSize: 'Tamanho da Fonte',
    small: 'Pequeno',
    medium: 'Médio',
    large: 'Grande',
    appLanguage: 'Idioma do App',
    portuguese: 'Português',
    english: 'Inglês',
    logout: 'Sair',
    successLogout: 'Você saiu com sucesso!',
  },
  en: {
    appTheme: 'App Theme',
    lightTheme: 'Light Theme',
    darkTheme: 'Dark Theme',
    fontSize: 'Font Size',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    appLanguage: 'App Language',
    portuguese: 'Portuguese',
    english: 'English',
    logout: 'Logout',
    successLogout: 'You have logged out successfully!',
  },
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt'); // Idioma padrão é português

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang) => {
    setLanguage(lang);
    await AsyncStorage.setItem('language', lang); // Salva a escolha do idioma no AsyncStorage
  };

  const translate = (key) => {
    return translations[language][key] || key; // Retorna o texto traduzido ou o próprio chave caso não haja tradução
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
