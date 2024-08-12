import React, { createContext, useState } from 'react';

// إنشاء السياق
export let isReceiveCodeContext = createContext();

// توفير السياق
export default function IsReceiveCodeProvider  ({ children })  {
  const [isReceiveCode, setIsReceiveCode] = useState(false);
  const [userEmail, setUserEmail] = useState('');



  return (
    <isReceiveCodeContext.Provider value={{ isReceiveCode, setIsReceiveCode , userEmail, setUserEmail}}>
      {children}
    </isReceiveCodeContext.Provider>


  );
};

