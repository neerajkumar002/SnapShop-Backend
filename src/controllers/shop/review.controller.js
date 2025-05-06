import { Product } from "../../models/product.model.js";
import { ProductReview } from "../../models/review.model.js";

const addProductReviews = async (req, res) => {
  try {
    const { productId, userId, fullName, reviewMessage, reviewValue } =
      req.body;
    if (!productId || !fullName || !userId || !reviewMessage || !reviewValue) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide required values" });
    }

    //check review is exists

    const checkExistinReview = await ProductReview.findOne({
      productId,
      userId,
    });

    if (checkExistinReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      fullName,
      reviewMessage,
      reviewValue,
    });

    newReview.save();

    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { averageReview });

    const reviewsList = await ProductReview.find({ productId });

    return res.status(201).json({
      success: true,
      data: reviewsList,
      massage: "Review successfully added!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error:" });
  }
};

//get review
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product id required!" });
    }

    const reviews = await ProductReview.find({ productId });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error:" });
  }
};

export { addProductReviews, getProductReviews };
