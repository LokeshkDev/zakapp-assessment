import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getProducts } from '../../api/productApi';
import { useToast } from '../../context/ToastContext';
import { useProductActions } from '../../hooks/useProductActions';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductToolbar from '../../components/ProductToolbar/ProductToolbar';
import Pagination from '../../components/Pagination/Pagination';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';


const ITEMS_PER_PAGE = 4;

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [sort, setSort] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(null);

    const { showToast } = useToast();
    const { handleEdit, handleDelete: performDelete } = useProductActions();

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            showToast('API is unreachable. Check JSON server.', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(p => p.title.toLowerCase().includes(q));
        }

        if (category !== 'All Categories') {
            result = result.filter(p => p.category === category);
        }

        if (sort) {
            const [field, dir] = sort.split('-');
            result.sort((a, b) => {
                const valA = field === 'price' ? a.price : a.title.toLowerCase();
                const valB = field === 'price' ? b.price : b.title.toLowerCase();

                if (valA < valB) return dir === 'asc' ? -1 : 1;
                if (valA > valB) return dir === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [products, search, category, sort]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedItems = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => setCurrentPage(1), [search, category, sort]);

    const confirmDelete = async () => {
        const success = await performDelete(deleteId);
        if (success) {
            setProducts(prev => prev.filter(p => p.id !== deleteId));
            setDeleteId(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-6">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Products</h1>                </div>

                <div className="flex flex-col gap-8">
                    <ProductToolbar
                        search={search}
                        onSearchChange={setSearch}
                        category={category}
                        onCategoryChange={setCategory}
                        sort={sort}
                        onSortChange={setSort}
                    />

                    {loading ? (
                        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-slate-400">
                            <i className="fa-solid fa-spinner fa-spin text-brand-600 text-4xl"></i>
                            <p className="text-sm font-medium">Syncing catalog...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-10">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {paginatedItems.map(p => (
                                    <ProductCard key={p.id} product={p} onEdit={handleEdit} onDelete={setDeleteId} />
                                ))}
                            </div>

                            <div className="flex justify-center">
                                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                            </div>
                        </div>
                    )}
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

export default ProductsPage;
