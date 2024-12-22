import mongoose from "mongoose";
import Product from "../models/product.model.js";


export const getProducts = async (req, resp) => {

    try {
        const product = await Product.find({});
        resp.status(200).json({ success: true, message: "All prodcut fetched", data:product});
    } catch (error) {
        console.log(error.message);
        resp.status(500).json({ success: false, message: "Error occured!"})
    }
}

export const addProduct = async (req, resp) => {

    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return resp.status(400).json({ success: false, message: "Please provide all fields"});
    }

    const newProduct = await Product(product);

    try {
        await newProduct.save();
        resp.status(201).json({ success: true, data: newProduct});
    } catch (error) {
        console.log("Error in create product");
        resp.status(500).json({ success: false, message: "server error"});
    }
}

export const deleteProduct = async (req, resp) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return resp.status(404).json({ success: false, message: "Invalid product id"})
    }

    try {
        
        await Product.findByIdAndDelete(id) ? 
        resp.status(200).json({ success: true, message: "Product deleted succussfully"})
        : resp.json({ message: "Product not found"});

        
    } catch (error) {
        console.log(error.message);
        resp.status(500).json({ success: false, message: "Server error"});
    }
}


export const updateProduct = async (req, resp) => {
    
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return resp.status(404).json({ success: false, message: "Invalid product id"})
    }

    try {

        await Product.findByIdAndUpdate(id, product, { new: true });
        resp.status(200).json({ success: true, message: "Product updated succussfully"});

    } catch (error) {
        console.log(error.message);
        resp.status(500).json({ success: false, message: "Error occured!"})
    }
}