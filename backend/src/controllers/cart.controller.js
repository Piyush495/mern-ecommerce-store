import Product from "../models/Product.js";

export const getCartProducts = async (req, res) => {
  try {
    const cartItemsArray = req.user.cartItems;
    const productIds = cartItemsArray.map((item) => item.product);

    const products = await Product.find({ _id: { $in: productIds } });

    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.product.toString() === product._id.toString(),
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });

    return res.json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId,
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({
        product: productId,
      });
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId,
      );
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in removefromcart controller",error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    if (quantity < 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId.toString(),
    );

    if (!existingItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId.toString(),
      );
    } else {
      existingItem.quantity = quantity;
    }

    await user.save();
    return res.json(user.cartItems);
  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
