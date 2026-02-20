import React from 'react';

import { useToast } from '../../context/ToastContext';
import { cn } from '../../lib/utils';

const Toast = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed right-4 top-20 z-[200] flex flex-col gap-3 sm:right-6">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    role="alert"
                    aria-live="polite"
                    className={cn(
                        "flex w-full max-w-md animate-in slide-in-from-right-full items-center gap-4 rounded-xl border p-4 shadow-xl backdrop-blur-xl duration-500",
                        toast.type === 'success' && "border-emerald-200 bg-emerald-50 text-emerald-900",
                        toast.type === 'error' && "border-red-200 bg-red-50 text-red-900",
                        toast.type === 'info' && "border-blue-200 bg-blue-50 text-blue-900"
                    )}
                >
                    <div className="shrink-0">
                        {toast.type === 'success' && <i className="fa-solid fa-circle-check text-emerald-500 text-lg" aria-hidden="true"></i>}
                        {toast.type === 'error' && <i className="fa-solid fa-circle-exclamation text-red-500 text-lg" aria-hidden="true"></i>}
                        {toast.type === 'info' && <i className="fa-solid fa-circle-info text-blue-500 text-lg" aria-hidden="true"></i>}
                    </div>

                    <p className="flex-1 text-sm font-semibold tracking-tight">
                        {toast.message}
                    </p>

                    <button
                        onClick={() => removeToast(toast.id)}
                        aria-label="Close notification"
                        className="rounded-lg p-1 transition-colors hover:bg-white/50"
                    >
                        <i className="fa-solid fa-xmark text-xs" aria-hidden="true"></i>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Toast;
