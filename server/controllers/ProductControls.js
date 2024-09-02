const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const { productname, category, price, description, information, productbrand } = req.body;
    const newProduct = new Product({ productname, category, price, description, information, productbrand });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({ message: 'Error while creating product' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Get All Products Error:', error);
    res.status(500).json({ message: 'Error while fetching products' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Get Product By ID Error:', error);
    res.status(500).json({ message: 'Error while fetching product' });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productname, category, price, description, information, productbrand } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { productname, category, price, description, information, productbrand },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Update Product Error:', error);
    res.status(500).json({ message: 'Error while updating product' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error('Delete Product Error:', error);
    res.status(500).json({ message: 'Error while deleting product' });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
