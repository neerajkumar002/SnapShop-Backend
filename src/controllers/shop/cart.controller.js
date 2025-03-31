import { Cart } from "../../models/cart.model.js";
import { Product } from "../../models/product.model.js";
//add to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invaild data provided" });
    }

    //find product
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    //find cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const findIndex = cart.items.findIndex((item) =>
        item.productId.equals(productId)
      );

      if (findIndex !== -1) {
        cart.items[findIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }
    cart.save();

    return res
      .status(200)
      .json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

// get user cart
const getCart = async (req, res) => {
  try {
    //get userId
    const { userId } = req.params;

    //if userid is invalid or not found
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invaild user id" });
    }
    //find cart by user id
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "title image price",
    });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const cartItems = cart.items.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      image: item.productId.image,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    return res
      .status(200)
      .json({ success: true, data: { ...cart._doc, items: cartItems } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error:" });
  }
};
// update quantity
const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid data provided!" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found!" });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not present" });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "title image price quantity",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      title: item.productId ? item.productId.title : "Product not found",
      image: item.productId ? item.productId.image : null,
      price: item.productId ? item.productId.price : null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: populateCartItems,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error:" });
  }
};

//remove cart item
const removeCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid Data provided" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title  price quantity",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      title: item.productId ? item.productId.title : "product not found",
      image: item.productId ? item.productId.image : null,
      price: item.productId ? item.productId.price : null,
      quantity: item.quantity,
    }));

    console.log(cart);

    // return res.status(200).json({
    //   success: true,
    //   message: "Cart item successfully deleted",

    //   data: {
    //     ...cart._doc,
    //     items: populateCartItems,
    //   },
    // });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error:" });
  }
};
//clear cart
const clearCart = async (req, res) => {
  try {
    const { userId, cartId } = req.params;

    if (!userId || !cartId) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid Data provided" });
    }

    await Cart.findOneAndDelete({ _id: cartId, userId });
    return res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error:" });
  }
};

export {
  addToCart,
  getCart,
  removeCartItem,
  clearCart,
  updateCartItemQuantity,
};
