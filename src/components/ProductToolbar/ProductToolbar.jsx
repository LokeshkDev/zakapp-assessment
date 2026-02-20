import React from 'react';


const CATEGORIES = ['All Categories', 'Men', 'Women', 'Electronics', 'Accessories'];

const SORT_OPTIONS = [
    { value: '', label: 'Price: All' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'title-asc', label: 'Name: A-Z' },
    { value: 'title-desc', label: 'Name: Z-A' },
];

const ProductToolbar = ({
    search,
    onSearchChange,
    category,
    onCategoryChange,
    sort,
    onSortChange
}) => {
    return (
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
            <div className="relative lg:flex-[4] w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <i className="fa-solid fa-magnifying-glass text-sm"></i>
                </div>
                <input
                    type="text"
                    className="input-field pl-11 h-11 border-slate-200 focus:border-brand-500 transition-all font-medium"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {search && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}
            </div>

            <div className="relative lg:flex-[3] w-full">
                <select
                    className="w-full h-11 pl-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm font-semibold appearance-none cursor-pointer focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs"></i>
            </div>

            <div className="relative lg:flex-[3] w-full">
                <select
                    className="w-full h-11 pl-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm font-semibold appearance-none cursor-pointer focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs"></i>
            </div>
        </div>
    );
};

export default ProductToolbar;
