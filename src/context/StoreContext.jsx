import React, { createContext, useState, useContext, useEffect } from 'react';
import { storeAPI } from '../services/api';
import { useAuth } from './AuthContext';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [stores, setStores] = useState([]);
    const [currentStore, setCurrentStore] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchStores();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        // Load saved store from localStorage
        const savedStoreId = localStorage.getItem('currentStoreId');
        if (savedStoreId && stores.length > 0) {
            const store = stores.find((s) => s.id === savedStoreId);
            if (store) {
                setCurrentStore(store);
            } else {
                // If saved store not found, select first store
                selectStore(stores[0]);
            }
        } else if (stores.length > 0 && !currentStore) {
            // Auto-select first store if none selected
            selectStore(stores[0]);
        }
    }, [stores]);

    const fetchStores = async () => {
        try {
            setLoading(true);
            const response = await storeAPI.getAll();
            setStores(response.data.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
        } finally {
            setLoading(false);
        }
    };

    const selectStore = (store) => {
        setCurrentStore(store);
        localStorage.setItem('currentStoreId', store.id);
    };

    const createStore = async (storeData) => {
        try {
            const response = await storeAPI.create(storeData);
            const newStore = response.data.data;
            setStores([...stores, newStore]);
            selectStore(newStore);
            return { success: true, store: newStore };
        } catch (error) {
            console.error('Error creating store:', error);
            return {
                success: false,
                error: error.response?.data?.error?.message || 'Failed to create store',
            };
        }
    };

    const updateStore = async (storeId, storeData) => {
        try {
            const response = await storeAPI.update(storeId, storeData);
            const updatedStore = response.data.data;
            setStores(stores.map((s) => (s.id === storeId ? updatedStore : s)));
            if (currentStore?.id === storeId) {
                setCurrentStore(updatedStore);
            }
            return { success: true, store: updatedStore };
        } catch (error) {
            console.error('Error updating store:', error);
            return {
                success: false,
                error: error.response?.data?.error?.message || 'Failed to update store',
            };
        }
    };

    const deleteStore = async (storeId) => {
        try {
            await storeAPI.delete(storeId);
            setStores(stores.filter((s) => s.id !== storeId));
            if (currentStore?.id === storeId) {
                setCurrentStore(stores[0] || null);
            }
            return { success: true };
        } catch (error) {
            console.error('Error deleting store:', error);
            return {
                success: false,
                error: error.response?.data?.error?.message || 'Failed to delete store',
            };
        }
    };

    const value = {
        stores,
        currentStore,
        loading,
        selectStore,
        createStore,
        updateStore,
        deleteStore,
        refreshStores: fetchStores,
    };

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};

export default StoreContext;
