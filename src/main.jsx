import 'vite/modulepreload-polyfill'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import App from './components/App';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('app');
const root = createRoot(domNode);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
