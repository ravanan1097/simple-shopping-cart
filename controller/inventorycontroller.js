const productmodel = require("../models/inventory");

/**
 * @description Create new product (Admin access only)
 * @param {*} req 
 * @param {*} res 
 * 
 */
exports.createProduct = async (req, res) => {
    try {
        let { productCode, productName, price, isActive, inStock } = req.body;

        let existingProduct = await productmodel.findOne({ where: { productCode } });

        if (existingProduct) return res.status(200).json({ message: "Product already exists" });

        await productmodel.create({
            productCode,
            productName,
            price,
            isActive,
            inStock
        });

        return res.status(201).json({ status: "Success" });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Failed", message: error.message });

    }
};

/**
 * @description Get all product list (Admin access only)
 * @param {*} req 
 * @param {*} res 
 * @returns  Product list
 */
exports.findAllProducts = async (req, res) => {
    try {

        let allProducts = await productmodel.findAll();
        res.status(200).json({ status: "Success", products: allProducts });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Failed", message: error.message });
    }
};

/**
 * @description Delete product by making isActive field as 'N' (Admin access only)
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteProduct = async (req, res) => {
    try {
        let { productCode } = req.body;

       let deletedProduct=  await productmodel.update({ isActive: 'N' }, { where: { productCode } });

         if (![deletedProduct] == 0) {
            return res.json({status:"Success",message:"Product  deleted"}).status(200);
        }
        else {
            return res.json({status:"Failed",message:"Product not deleted"}).status(200);
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Failed", message: error.message });
    }
};

/**
 * @description Update the product in inventory (Admin access only)
 * @param {*} req 
 * @param {*} res 
 * 
 */
exports.updateProduct=async(req,res)=>{
    try {
        let { productCode, productName, price, inStock } = req.body;

        let updatedProduct=await productmodel.update({productName, price, inStock},{where:{productCode}});

        if (![updatedProduct] == 0) {
            return res.json({status:"Success",message:"Product  updated"}).status(200);
        }
        else {
            return res.json({status:"Failed",message:"Product not updated"}).status(200);
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Failed", message: error.message });
    }
};

/**
 * @description Get product list for customers (for isActive:'Y')
 * @param {*} req 
 * @param {*} res 
 * @returns Active Product List
 */
exports.getProductsForUsers = async (req, res) => {
    try {

        let allProducts = await productmodel.findAll({where:{isActive:'Y'}});
        res.status(200).json({ status: "Success", products: allProducts });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Failed", message: error.message });
    }
};

