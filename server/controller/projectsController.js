const { productSchema } = require("../helper/addProductValidation");
const Product = require("../module/productModel")

//add product comtroller
exports.createProduct = async (req, res) => {
    try {
        // Joi validation
        const { error, value } = productSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
        if (error) {
            const errors = error.details.map(detail => {
                return {
                    field: detail.context.key,
                    message: `${detail.context.key} ${detail.message}`
                };
            });
            return res.status(400).json({statusCode : 400, errors });
        }
        // Destructure validated data
        const { name, description, price } = req.body;
        const userId = req.userId;
        // Create new product object
        const product = new Product({ name, description, price, userId  });

        // Save product in MongoDB
        await product.save();
        return res.status(201).json({ statusCode:201, msg: 'Product added successfully', product });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

//get all products controller
exports.gatAllProducts = async(req, res) => {
    try {
         // Extract user ID from authenticated user (assuming it's stored in req.user)
            const userId = req.userId;
            const products = await Product.find({userId});

        if (products.length == 0) {
            return res.status(400).json({ statusCode: 400, msg: 'Product not found or unauthorized' });
        }

        return res.status(200).json({ statusCode: 200, msg: 'Product deleted successfully', products });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }

}

// get a single product Controller 
exports.getSingleProduct = async (req, res) => {
    try {
        // Extract user ID from authenticated user (assuming it's stored in req.user)
        const userId = req.userId;
        const productId = req.params.id; // Assuming the product ID is passed as a parameter in the request

        // Find the product with the given ID and associated with the user
        const product = await Product.findOne({ _id: productId, userId });

        if (!product) {
            return res.status(400).json({statusCode: 400, error: 'Product not found' });
        }

        return res.status(200).json({ statusCode: 200, product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//delete product controller
exports.deleteProduct = async (req, res) => {
    try {
        // Extract user ID from authenticated user (assuming it's stored in req.user)
        const userId = req.userId;

        // Get the product ID from request parameters
        const productId = req.params.id;

        // Find and delete the product based on user ID and product ID
        const deletedProduct = await Product.findOneAndDelete({ _id: productId, userId});

        if (!deletedProduct) {
            return res.status(400).json({ statusCode: 400, msg: 'Product not found or unauthorized' });
        }

        return res.status(200).json({ statusCode: 200, msg: 'Product deleted successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

//update product controller
exports.updateProduct = async (req, res) => {
    try {
        // Extract user ID from authenticated user (assuming it's stored in req.user)
        const userId = req.userId;

        // Get the product ID from request parameters
        const productId = req.params.id;

        // Find and update the product based on user ID and product ID
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productId, userId }, // query
            { $set: req.body }, // update
            { new: true } // options: return the updated document
        );

        if (!updatedProduct) {
            return res.status(400).json({ statusCode: 400, msg: 'Product not found or unauthorized' });
        }

        return res.status(200).json({ statusCode: 200, msg: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

