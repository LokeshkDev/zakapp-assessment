import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import AdminPage from './pages/AdminPage/AdminPage';
import Toast from './components/Toast/Toast';
import { ToastProvider } from './context/ToastContext';

function App() {
    return (
        <ToastProvider>
            <div className="flex min-h-screen flex-col bg-slate-50 font-sans selection:bg-brand-100 selection:text-brand-900">
                <Navbar />

                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<ProductsPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="*" element={<div className="container mx-auto py-20 text-center">Page not found</div>} />
                    </Routes>
                </main>
                <Toast />

                <footer className="mt-auto border-t border-slate-200 bg-white py-8">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            © {new Date().getFullYear()} React Store. Developed by Lokesh
                        </p>
                    </div>
                </footer>
            </div>
        </ToastProvider>
    );
}

export default App;
