import React from 'react';
import ReactDOM from 'react-dom';
import { Main} from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={(<Main/>)} />
                </Routes>
            </BrowserRouter>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
