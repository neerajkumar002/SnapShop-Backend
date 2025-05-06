import { Order } from "../../models/order.model.js";
import stripe from "../../config/stripeConfig.js";
import { Cart } from "../../models/cart.model.js";

//create order
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      totalAmount,
      orderStatus,
      paymentStatus,
      paymentMethod,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      totalAmount,
      orderStatus,
      paymentStatus,
      paymentMethod,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    });

    await newOrder.save();

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_ORIGIN}/payment-return/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_ORIGIN}/cancel`,

      //store userid for reference
      metadata: {
        userId: userId,
      },

      payment_intent_data: {
        metadata: {
          userId: userId,
        },
      },
    });

    return res
      .status(200)
      .json({ succcess: true, url: session.url, orderId: newOrder._id });
  } catch (error) {
    return res.status(500).json({ success: false, message: "error" });
  }
};

// payment capture
const capturePayment = async (req, res) => {
  try {
    const { session_id, orderId } = req.body;

    //find order
    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: "false",
        message: "Order can not be found!",
      });
    }

    //retrieve the session details from stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    order.paymentStatus = session.payment_status;
    order.orderStatus = "confirmed";
    order.paymentId = session.payment_intent;
    order.payerId = session.metadata["userId"];

    //delete cart
    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    return res
      .status(200)
      .json({ success: true, message: "Order Confirmed", data: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

//fetch all orders
const fetehOrdersList = async (req, res) => {
  try {
    // get userid
    const { userId } = req.params;
    //find orders
    const orders = await Order.find({ userId });
    if (!orders) {
      return res
        .status(404)
        .json({ succcess: false, message: "No orders founds!" });
    }
    return res.status(200).json({ succcess: true, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: "error" });
  }
};

//fetch all order details by order id
const getOrderDetails = async (req, res) => {
  try {
    // get order id from params
    const { id } = req.params;

    //check if order id is missing or empty
    if (!id) {
      return res
        .status(400)
        .json({ succcess: false, message: "Order id is required!" });
    }

    //find  single  order
    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ succcess: false, message: "No order founds!" });
    }
    return res.status(200).json({ succcess: true, data: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: "error" });
  }
};

export { createOrder, capturePayment, fetehOrdersList, getOrderDetails };
