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
    const { addressId } = req.params;
    console.log(addressId);
    if (!addressId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address id" });
    }

    const address = await Address.findById(addressId);

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

//delete address
const deleteAddress = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

//update address
const updateAddress = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

export { addAddress, fetchAllAddresses, getAddress };
