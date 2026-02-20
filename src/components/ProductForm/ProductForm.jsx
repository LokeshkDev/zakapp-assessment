import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

const CATEGORIES = ['Men', 'Women', 'Electronics', 'Accessories'];

const ProductForm = ({ product, onSubmit, onCancel, isEditing, disabled }) => {
    const [form, setForm] = useState({
        title: '',
        price: '',
        category: 'Men',
        description: '',
        image: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (product && isEditing) {
            setForm({ ...product });
        } else {
            setForm({
                title: '',
                price: '',
                category: 'Men',
                description: '',
                image: '',
            });
        }
    }, [product, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = 'Title is required';
        if (!form.price || Number(form.price) <= 0) newErrors.price = 'Enter a valid price';
        if (!form.description.trim()) newErrors.description = 'Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (disabled) return;
        if (!validate()) return;
        onSubmit({ ...form, price: Number(form.price) });
    };

    return (
        <div className={cn("card overflow-hidden transition-all duration-300", disabled && "opacity-50 grayscale-[20%]")}>
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <i className={cn(isEditing ? "fa-solid fa-pen-to-square" : "fa-solid fa-plus-circle", "text-brand-600")}></i>
                    {isEditing ? (disabled ? 'Edit Product' : `Edit Product: ${product?.title}`) : 'Add New Product'}
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className="label">Product Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            disabled={disabled}
                            className={cn("input-field", errors.title && "border-red-500 ring-red-500/10", disabled && "bg-slate-50 cursor-not-allowed")}
                            placeholder="e.g. Classic Denim Shirt"
                        />
                        {errors.title && <p className="mt-1 text-xs font-medium text-red-500">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="label">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            disabled={disabled}
                            className={cn("input-field", errors.price && "border-red-500 ring-red-500/10", disabled && "bg-slate-50 cursor-not-allowed")}
                            placeholder="0.00"
                        />
                        {errors.price && <p className="mt-1 text-xs font-medium text-red-500">{errors.price}</p>}
                    </div>

                    <div>
                        <label className="label">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            disabled={disabled}
                            className={cn("input-field", disabled && "bg-slate-50 cursor-not-allowed")}
                        >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="label">Image URL</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                <i className="fa-solid fa-image text-sm"></i>
                            </div>
                            <input
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                disabled={disabled}
                                className={cn("input-field pl-10", disabled && "bg-slate-50 cursor-not-allowed")}
                                placeholder="https://images.unsplash.com/..."
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="label">Description</label>
                        <textarea
                            name="description"
                            rows={3}
                            value={form.description}
                            onChange={handleChange}
                            disabled={disabled}
                            className={cn("input-field resize-none", errors.description && "border-red-500 ring-red-500/10", disabled && "bg-slate-50 cursor-not-allowed")}
                            placeholder="Tell customers about this product..."
                        />
                        {errors.description && <p className="mt-1 text-xs font-medium text-red-500">{errors.description}</p>}
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-4 border-t border-slate-100 pt-6">
                    <button
                        type="submit"
                        disabled={disabled}
                        className={cn(
                            "text-sm font-bold py-2.5 px-8 rounded-lg shadow-sm transition-all active:scale-[0.98]",
                            disabled ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-[#3a715a] hover:bg-[#2d5846] text-white"
                        )}
                    >
                        {isEditing ? 'Update Product' : 'Save Product'}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={disabled}
                            className={cn(
                                "border border-slate-200 text-sm font-bold py-2.5 px-8 rounded-lg transition-all active:scale-[0.98]",
                                disabled ? "bg-slate-50 text-slate-300 cursor-not-allowed" : "bg-white text-slate-400 hover:bg-slate-50"
                            )}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
