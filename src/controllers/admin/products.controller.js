import { Product } from "../../models/product.model.js";
import fs from "fs";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
//create product
const createProduct = async (req, res) => {
  try {
    //get all value
    const { title, description, price, category } = req.body;
    const productImageLocalPath = req.file?.path;

    if (!productImageLocalPath) {
      return res
        .status(409)
        .json({ success: false, message: "Product image is required" });
    }

    const productImage = await uploadOnCloudinary(productImageLocalPath);

    //check value not empty
    if (!title || !description || !price || !category) {
      return res
        .status(500)
        .json({ success: false, message: "Please Provide all values" });
    }

    const newlyCreatedProduct = new Product({
      title,
      description,
      price,
      category,
      image: productImage?.url,
    });

    await newlyCreatedProduct.save();

    fs.unlinkSync(productImageLocalPath);

    return res
      .status(200)
      .json({ success: true, message: "Product Successfuly created." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error" });
  }
};

//update product
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, description, price, category } = req.body;

    if (!productId) {
      return res
        .status(404)
        .json({ success: false, message: "Please Provide Vaild Product Id" });
    }

    //find product
    const product = await Product.findById({ _id: productId });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product dose not exist" });
    }
    const productImageLocalPath = req.file?.path;
    let productImage;
    if (productImageLocalPath) {
      productImage = await uploadOnCloudinary(productImageLocalPath);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
        category: category || product.category,
        image: productImageLocalPath ? productImage.url : product?.image,
      },
      { new: true }
    );

    if (productImageLocalPath) {
      fs.unlinkSync(productImageLocalPath);
    }

    return res.status(200).json({
      success: true,
      updatedProduct,
      message: "Product Successfuly updated.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error" });
  }
};

//delete product by product id
const deleteProduct = async (req, res) => {
  try {
    // get product id
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete({ _id: productId });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid product id" });
    }

    return res.status(200).json({
      success: true,
      deletedProduct: product,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

// getProductById
const getProductById = async (req, res) => {
  try {
    //get product id
    const { productId } = req.params;
    //find product
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Product id" });
    }

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

// get all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    if (!listOfProducts) {
      return res
        .status(404)
        .json({ success: false, message: "No product list available" });
    }

    return res.status(200).json({ success: true, data: listOfProducts });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error: in fetch product list" });
  }
};

export {
  createProduct,
  fetchAllProducts,
  deleteProduct,
  getProductById,
  updateProduct,
};
