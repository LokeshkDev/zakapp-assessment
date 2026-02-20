import React from 'react';


const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onCancel}
            />
            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-premium animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center p-8 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">{title || 'Confirm Delete'}</h3>
                    <p className="text-sm leading-relaxed text-slate-500">
                        {message || 'Are you sure you want to remove this item? This action is permanent and cannot be undone.'}
                    </p>
                </div>
                <div className="flex border-t border-slate-100 bg-slate-50/50 p-4 gap-3">
                    <button onClick={onCancel} className="btn-outline flex-1">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="btn-danger flex-1">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
