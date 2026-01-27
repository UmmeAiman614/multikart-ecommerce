import axios from "axios";

// BASE URL (env se)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// TOKEN attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

const getAuthConfig = () => {
  const token = localStorage.getItem('token'); // Check karein aapne token isi naam se save kiya hai
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchDashboardData = () => API.get('/admin/dashboard-summary');
// ================= AUTH =================
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getProfile = () => API.get("/auth/profile");
export const updateProfile = (formData) => API.put("/auth/profile/update", formData);
export const getAllUsers = () => API.get("/auth/all-users");
export const deleteUser = (id) => API.delete(`/auth/user/${id}`);
export const updateUserAdmin = (id, data) => API.put(`/auth/user/update/${id}`, data);
export const getUserById = (id) => API.get(`/auth/user/${id}`);

// ================= CATEGORY =================
export const addCategory = (data) => API.post("/category/add", data);
export const getAllCategories = () => API.get("/category/all");
export const getCategoryById = (id) => API.get(`/category/${id}`);
export const updateCategory = (id, data) =>
  API.put(`/category/update/${id}`, data);
export const deleteCategory = (id) =>
  API.delete(`/category/delete/${id}`);


// ================= PRODUCT =================
export const addProduct = (data) => API.post("/product/add", data);
export const getAllProducts = () => API.get("/product/all");
export const getSingleProduct = (id) => API.get(`/product/${id}`);
export const getFeaturedProducts = () =>
  API.get("/product/featured/all");
export const getSaleProducts = () =>
  API.get("/product/sale/all");
export const updateProduct = (id, data) =>
  API.put(`/product/update/${id}`, data);
export const deleteProduct = (id) =>
  API.delete(`/product/delete/${id}`);


// ================= CART =================
export const addToCart = (data) => API.post("/cart/add", data);
export const getCart = () => API.get("/cart/view");
export const removeFromCart = (id) =>
  API.delete(`/cart/remove/${id}`);
export const clearCart = () => API.delete("/cart/clear");
// export const applyCoupon = (data) => API.post("/cart/apply-coupon", data);

export const getAllReviewsAdmin = () => API.get('/reviews/all', getAuthConfig());
export const updateReviewStatus = (id, status) => API.put(`/reviews/approve/${id}`, status, getAuthConfig());
export const deleteReview = (id) => API.delete(`/reviews/${id}`, getAuthConfig());

// Baki functions (Public)
export const createReview = (reviewData) => API.post('/reviews', reviewData);
export const getProductReviews = (productId) => API.get(`/reviews/product/${productId}`);
// ================= ORDER =================
export const createOrder = (data) => API.post("/order/create", data);
export const getMyOrders = () => API.get("/order/my-orders");
export const getAllOrders = () => API.get("/order/all"); // admin
export const updateOrderStatus = (id, data) =>
  API.put(`/order/update-status/${id}`, data);
export const deleteOrder = (id) => API.delete(`/order/delete/${id}`);
// Coupons
export const applyCoupon = (data) => API.post("/coupons/apply", data);
export const createCoupon = (data) => API.post("/coupons/create", data);
export const getAllCoupons = () => API.get("/coupons/all");
export const getLatestCoupon = () => API.get("/coupons/latest");
export const deleteCoupon = (id) => API.delete(`/coupons/delete/${id}`);


// ================= WISHLIST =================
export const getWishlist = () => API.get("/wishlist/my-wishlist");
export const toggleWishlist = (productId) => API.post("/wishlist/toggle", { productId });


// ================= TESTIMONIAL =================
export const addTestimonial = (data) =>
  API.post("/testimonial/add", data);
export const getAllTestimonials = () =>
  API.get("/testimonial/all");
export const getActiveTestimonials = () =>
  API.get("/testimonial/active");
export const updateTestimonial = (id, data) =>
  API.put(`/testimonial/update/${id}`, data);
export const deleteTestimonial = (id) =>
  API.delete(`/testimonial/delete/${id}`);




export default API;
