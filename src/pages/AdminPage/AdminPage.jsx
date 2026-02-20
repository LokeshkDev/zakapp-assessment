import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api/productApi';
import { useToast } from '../../context/ToastContext';
import ProductForm from '../../components/ProductForm/ProductForm';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { cn } from '../../lib/utils';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(true);

    const { showToast } = useToast();
    const location = useLocation();

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            showToast('Failed to load catalog', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if (location.state?.editProduct) {
            setEditingProduct(location.state.editProduct);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleAdd = async (data) => {
        try {
            const created = await createProduct(data);
            setProducts(prev => [created, ...prev]);
            showToast('Product added to catalog', 'success');
        } catch (error) {
            showToast('Error adding product', 'error');
        }
    };

    const handleUpdate = async (data) => {
        try {
            const updated = await updateProduct(editingProduct.id, data);
            setProducts(prev => prev.map(p => p.id === editingProduct.id ? updated : p));
            setEditingProduct(null);
            showToast('Changes saved successfully', 'success');
        } catch (error) {
            showToast('Error updating product', 'error');
        }
    };

    const confirmDelete = async () => {
        try {
            await deleteProduct(deleteId);
            setProducts(prev => prev.filter(p => p.id !== deleteId));
            if (editingProduct?.id === deleteId) setEditingProduct(null);
            showToast('Product removed', 'success');
        } catch (error) {
            showToast('Delete failed', 'error');
        } finally {
            setDeleteId(null);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6 lg:px-8">
            <div className="mb-10 text-center lg:text-left">
                <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Admin Dashboard</h1>
            </div>

            <div className="flex flex-col gap-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="flex flex-col gap-4">
                        <ProductForm
                            onSubmit={handleAdd}
                            isEditing={false}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <ProductForm
                            product={editingProduct}
                            isEditing={true}
                            onSubmit={handleUpdate}
                            onCancel={() => setEditingProduct(null)}
                            disabled={!editingProduct}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <div className="card overflow-hidden h-full">
                        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
                            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                                <i className="fa-solid fa-layer-group text-brand-600" aria-hidden="true"></i>
                                Product Inventory
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4">Product Details</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={4} className="py-20 text-center text-slate-400">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="h-6 w-6 border-2 border-slate-200 border-t-brand-600 rounded-full animate-spin"></div>
                                                    <span>Loading inventory items...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : products.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="py-20 text-center text-slate-400">
                                                Your inventory is currently empty.
                                            </td>
                                        </tr>
                                    ) : (
                                        products.map((p) => (
                                            <tr key={p.id} className="group transition-colors hover:bg-slate-50/50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200 p-1">
                                                            <img
                                                                src={p.image}
                                                                alt=""
                                                                className="h-full w-full object-contain"
                                                                onError={(e) => { e.target.src = 'https://placehold.co/48x48?text=?'; }}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-slate-900">{p.title}</span>
                                                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">SKU: PROD-{p.id}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                                                        {p.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-black text-slate-900">
                                                    <div className="flex items-center">
                                                        <i className="fa-solid fa-indian-rupee-sign text-xs mr-1" aria-hidden="true"></i>
                                                        {p.price.toLocaleString('en-IN')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => { setEditingProduct(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-all hover:bg-white hover:text-brand-600 hover:border-brand-200 hover:shadow-sm"
                                                            aria-label={`Edit ${p.title}`}
                                                            title="Edit Product"
                                                        >
                                                            <i className="fa-solid fa-pen-to-square text-sm" aria-hidden="true"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteId(p.id)}
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                                                            aria-label={`Remove ${p.title}`}
                                                            title="Remove Product"
                                                        >
                                                            <i className="fa-solid fa-trash-can text-sm" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={!!deleteId}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
};

export default AdminPage;
