//add address

import { Address } from "../../models/address.model.js";

const addAddress = async (req, res) => {
  try {
    const { userId, fullName, email, phone, address, city, state, pincode } =
      req.body;

    if (
      !userId ||
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields required!" });
    }

    const newAddress = new Address({
      userId,
      fullName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
    });

    await newAddress.save();
    return res
      .status(201)
      .json({ success: true, message: "Address added successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

//fetch all addresses
const fetchAllAddresses = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invaild user id" });
    }

    const addressList = await Address.find({ userId });

    return res.status(200).json({ success: true, data: addressList });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

//fetch  address by id
const getAddress = async (req, res) => {
  try {
    console.log("X");
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address id" });
    }

    const address = await Address.findById(id);

    console.log(address);

    if (!address) {
      return res
        .status(400)
        .json({ success: false, message: "Address not found" });
    }

    return res.status(200).json({ success: true, data: address });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

//update address
const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ success: false, message: "user and address Id is  required" });
    }

    const address = await Address.findByIdAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    return res.status(200).json({ success: true, data: address });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

//delete address
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId && !addressId) {
      return res
        .status(400)
        .json({ success: false, message: "User and Address id is required!" });
    }

    await Address.findOneAndDelete({ _id: addressId, userId: userId });

    return res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

export {
  addAddress,
  fetchAllAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
};
