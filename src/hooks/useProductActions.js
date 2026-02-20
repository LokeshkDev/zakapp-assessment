import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { deleteProduct as deleteProductApi } from '../api/productApi';
export const useProductActions = (refreshCallback) => {
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleEdit = (product) => {
        navigate('/admin', { state: { editProduct: product } });
    };

    const handleDelete = async (id) => {
        try {
            await deleteProductApi(id);
            showToast('Product removed successfully', 'success');
            if (refreshCallback) refreshCallback();
            return true;
        } catch (error) {
            showToast('Error deleting product', 'error');
            return false;
        }
    };

    return { handleEdit, handleDelete };
};
