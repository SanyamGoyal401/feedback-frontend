import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductProvider } from './contexts/ProductContext';
import { FilterProvider } from './contexts/FilterContext';
import { SortProvider } from './contexts/SortContext';
import { AuthProvider } from './contexts/AuthContext';
import { ModalProvider } from './contexts/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <FilterProvider>
          <SortProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </SortProvider>
        </FilterProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);

