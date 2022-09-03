import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ModalState } from './context/ModalContext';
import { UserState } from './context/UserContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <UserState>
      <ModalState>
        <App />
      </ModalState>
    </UserState>
  </BrowserRouter>
);
