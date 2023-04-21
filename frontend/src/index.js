import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, Box, AbsoluteCenter } from "@chakra-ui/react";
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContext>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AuthContext>
  </BrowserRouter>
);
