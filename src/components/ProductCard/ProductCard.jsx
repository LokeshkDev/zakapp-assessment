import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN').format(price);
    };

    return (
        <div className="card overflow-hidden flex flex-col h-full hover:shadow-premium group">
            <div className="aspect-[4/3] bg-white p-6 flex items-center justify-center border-b border-slate-50 relative">
                <img
                    src={product.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800'}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=No+Image'; }}
                />
                <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <span className="rounded-full bg-slate-900/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 backdrop-blur-md">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1 transition-colors group-hover:text-brand-600" title={product.title}>
                    {product.title}
                </h3>
                <div className="text-lg font-black text-slate-800 mb-5">
                    <span className=" font-bold mr-0.5">₹</span>
                    {formatPrice(product.price)}
                </div>

                <div className="mt-auto flex items-center gap-2">
                    <button
                        onClick={() => onEdit(product)}
                        className="btn-primary flex-1 h-10 text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(product.id)}
                        className="flex-1 h-10 border border-slate-200 font-bold text-brand-600 text-xs hover:bg-red-50 hover:text-red-600 transition-all hover:border-red-200 rounded-lg flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-trash-can" aria-hidden="true"></i>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
