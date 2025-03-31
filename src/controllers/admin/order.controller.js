import { Order } from "../../models/order.model.js";

// get all orders for admin

const getOrdersForAdmin = async (req, res) => {
  try {
    const ordersList = await Order.find({});

    if (!ordersList) {
      return res
        .status(400)
        .json({ success: false, message: "No orders found" });
    }

    console.log(ordersList);

    return res.status(200).json({ success: true, data: ordersList });
  } catch (error) {
    return res.status(500).json({ success: false, message: "error" });
  }
};

//get order details for admin
const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a vaild ID" });
    }

    const orderDetails = await Order.findById(id);
    console.log("order details", orderDetails);

    return res.status(200).json({ success: true, data: orderDetails });
  } catch (error) {
    return res.status(500).json({ success: false, message: "error" });
  }
};
//update order status for admin
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    console.log(id, orderStatus);
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid ID" });
    }
    if (!orderStatus) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid order status",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    return res
      .status(200)
      .json({ success: true, message: "Order status is updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "error" });
  }
};

export { getOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus };
