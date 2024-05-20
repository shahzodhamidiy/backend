import userModel from "../models/userModel.js";

const addToCart = async(req, res) => {
    try {
        const { userId, itemId } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        let cartData = userData.cartData || {};
        cartData[itemId] = cartData[itemId] ? cartData[itemId] + 1 : 1;
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};

const removeFromCart = async(req, res) => {
    try {
        const { userId, itemId } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        let cartData = userData.cartData || {};
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
};

const getCart = async(req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error fetching cart data' });
    }
};

export { addToCart, removeFromCart, getCart };