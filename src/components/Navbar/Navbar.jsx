import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
                <NavLink to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900" aria-label="Home">
                    <h1>React<span className="text-brand-600">STore</span></h1>
                </NavLink>

                <nav className="flex items-center gap-1 sm:gap-2">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => cn(
                            "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                            isActive
                                ? "bg-brand-50 text-brand-700"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                    >
                        <i className="fa-solid fa-boxes-stacked text-sm" aria-hidden="true"></i>
                        <span className="hidden sm:inline">Products</span>
                    </NavLink>

                    <NavLink
                        to="/admin"
                        className={({ isActive }) => cn(
                            "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                            isActive
                                ? "bg-brand-50 text-brand-700"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                    >
                        <i className="fa-solid fa-table-columns text-sm" aria-hidden="true"></i>
                        <span className="hidden sm:inline">Admin</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
