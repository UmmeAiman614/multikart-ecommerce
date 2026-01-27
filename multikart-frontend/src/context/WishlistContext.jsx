import React, { createContext, useState, useContext, useEffect } from 'react';
import { getWishlist, toggleWishlist as toggleWishlistApi } from '../api/api';
import { AuthContext } from './AuthContext';
import { toast } from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch wishlist when user logs in
    useEffect(() => {
        if (user) {
            fetchWishlist();
        } else {
            setWishlist([]);
        }
    }, [user]);

    const fetchWishlist = async () => {
        try {
            const res = await getWishlist();
            setWishlist(res.data.products || []);
        } catch (err) {
            console.error("Wishlist fetch error");
        }
    };

    const toggleWishlist = async (product) => {
        if (!user) {
            toast.error("Please login to use wishlist");
            return;
        }
        try {
            await toggleWishlistApi(product._id);
            
            // UI update (Optimistic update)
            const isExist = wishlist.find(item => item._id === product._id);
            if (isExist) {
                setWishlist(wishlist.filter(item => item._id !== product._id));
                toast.success("Removed from wishlist");
            } else {
                setWishlist([...wishlist, product]);
                toast.success("Added to wishlist");
            }
        } catch (err) {
            toast.error("Wishlist update failed");
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item._id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, loading }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);