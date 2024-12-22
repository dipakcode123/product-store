import { create } from 'zustand'
import axios from 'axios'

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill all fields." }
        }

        const response = await fetch('/api/products/add-product', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const data = await response.json();
        set((state) => ({ products: [...state.products, data.data] }))
        return { success: true, message: "Product created successfully." }
    },

    fetchProducts: async () => {
        const data = await fetch('/api/products');
        const res = await data.json();
        set({ products: res.data });
    },
    deleteProduct: async (pid) => {
        const data = await fetch(`/api/products/${pid}`, { method: "DELETE" });
        const res = await data.json();

        if (!res.success) {
            return { success: false, message: res.message }
        }
        
        set((state) => ({ products: state.products.filter(product => product._id !== pid) }))
        return { success: true, message: res.message };
    },
    updateProductData: async (pid, updateProduct) => {

        // if (!updateProduct.name || !updateProduct.image || !updateProduct.price) {
        //     return { success: false, message: "Please fill all fields." }
        // }

        const data = await fetch(`/api/products/${pid}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateProduct)
            }
        )

        const res = await data.json();
        set((state) => ({ products: state.products.map(product => product._id === pid ? res.data : product) }))
        return { success: true, message: "Product update successfully." }
    }
}))
