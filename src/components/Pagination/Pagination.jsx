import React from 'react';
import { cn } from '../../lib/utils';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-outline h-9 w-9 p-0 rounded-lg text-slate-400 hover:text-brand-600 disabled:opacity-30 transition-colors"
            >
                <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={cn(
                        "h-9 w-9 rounded-lg text-xs font-bold transition-all",
                        page === currentPage
                            ? "bg-brand-600 text-white shadow-lg shadow-brand-200"
                            : "bg-white border border-slate-200 text-slate-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                    )}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn-outline h-9 w-9 p-0 rounded-lg text-slate-400 hover:text-brand-600 disabled:opacity-30 transition-colors"
            >
                <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
        </div>
    );
};

export default Pagination;
