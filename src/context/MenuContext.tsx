'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  triggerPageExitAndNavigate?: (path: string) => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

interface MenuProviderProps {
  children: ReactNode;
  triggerPageExitAndNavigate?: (path: string) => Promise<void>;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({
  children,
  triggerPageExitAndNavigate,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen, triggerPageExitAndNavigate }}>
      {children}
    </MenuContext.Provider>
  );
};
