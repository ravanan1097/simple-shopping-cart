const cartmodel = require("../models/cart");
const usermodel = require("../models/users");
const inventorymodel = require("../models/inventory");
const cartCountmodel = require("../models/cartcount");


/**
 * @description Add new items to cart and update existing item in cart
 * @param {*} req 
 * @param {*} res 
 */
exports.addToCart = async (req, res) => {
    try {
        let { productDetails } = req.body;
        let userDetails = await usermodel.findOne({ where: { userName: req.user }, include: [{ model: cartCountmodel, as: 'cart_count', attributes: ['count'] }] });
        let userId = userDetails.id;
        let { cart_count: { count } } = userDetails

        if (!count) {

            for (let val of productDetails) {
                let product = await inventorymodel.findOne({ where: { productCode: val.productCode } });

                let quantity = parseInt(val.quantity);
                let price = parseFloat(product.price);
                let totalprice = quantity * price;

                let addCart = await cartmodel.create({
                    product: product.productCode,
                    quantity: quantity,
                    totalPrice: totalprice
                })
                addCart.setUser(userDetails);

            };

            let firstCount = await cartCountmodel.create({ count: productDetails.length });

            firstCount.setUser(userDetails);

        }
        else {
            let cartDetails = await cartmodel.findAll({ where: { userId } });

            for (let prcode of cartDetails) {

                let productCode = prcode.product;
                let originalQuantity = prcode.quantity

                for (let data of productDetails) {
                    let product = await inventorymodel.findOne({ where: { productCode: data.productCode } });

                    let quantity = parseInt(data.quantity);
                    let price = parseFloat(product.price);
                    let totalPrice = quantity * price;

                    if (productCode == data.productCode && originalQuantity !== quantity) {
                        console.error("Inside of quantity block");
                        await cartmodel.update({ quantity, totalPrice }, { where: { userId, product: productCode } });
                    }

                }
            }

        }
       return res.status(200).json({ status: "Success", message: "Added to cart" });
    }
    catch (error) {
        console.error(error);
      return  res.status(500).json({ status: "Failed", message: error.message })
    }

};

/**
 * @description Get cart details for customer
 * @param {*} req 
 * @param {*} res 
 * @returns Cart item lists
 */
exports.getCart = async (req, res) => {

    try {
        let userName = req.user;

        let userDetails = await usermodel.findOne({ where: { userName }, include: [{ model: cartCountmodel, as: 'cart_count', attributes: ['count'] }] });

        let { cart_count: { count } } = userDetails;

        if (count) {
            let cartdetails = await userDetails.getCarts();
            return res.status(200).json({ status: "Success", cartdetails });
        }
        else {
            return res.status(200).json({ status: "Not Found", message: "No cart details found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Failed", message: error.message })
    }
};

/**
 * @description Empty the cart items
 * @param {*} req 
 * @param {*} res 
 */
exports.emptyCart = async (req, res) => {
    try {
        let userName = req.user;

        let userId = await usermodel.findOne({ attributes: ['id'] }, { where: { userName } });

        await cartmodel.destroy({ where: { userId } });
        await cartCountmodel.destroy({ where: { userId } });

        return res.status(200).json({ status: "Success", message: "Cart Emptied" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Failed", message: error.message })
    }
}
