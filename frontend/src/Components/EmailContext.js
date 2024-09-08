import React, { createContext, useContext, useState } from 'react';

const EmailContext = createContext();

export function EmailProvider({ children }) {
  const [email, setEmail] = useState(null);

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  return useContext(EmailContext);
}
