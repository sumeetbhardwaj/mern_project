const express = require("express");
const { addUser, login, logout } = require("../controller/userController");
const { createProduct, gatAllProducts, deleteProduct, updateProduct, getSingleProduct } = require("../controller/projectsController");
const { isAuth } = require("../meddleware/authMeddleware");
const Router = express.Router();

Router.route("/").get((req, res)=>{
    res.send("Hi This node js API's use only for demo project's")
})

Router.route("/signup").post(addUser)

Router.route("/signin").post(login)

Router.route("/logout").get(isAuth, logout)

Router.route("/add_product").post(isAuth, createProduct)

Router.route("/get_products").get(isAuth,gatAllProducts)

Router.route('/single_product/:id').get(isAuth,getSingleProduct)

Router.route('/update_product/:id').put(isAuth,updateProduct)

Router.route('/delete_product/:id').delete(isAuth,deleteProduct)




module.exports = Router