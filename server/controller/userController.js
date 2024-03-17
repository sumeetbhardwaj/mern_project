const User = require("../module/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { addUserSchema } = require("../helper/addUserValidation");
const { loginSchema } = require("../helper/loginValidation");


//add user controller
exports.addUser = async (req, res) => {
    try {
        // Joi validation
        const { error, value } = addUserSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
        if (error) {
            const errors = error.details.map(detail => {
                return {
                    field: detail.context.key,
                    message: `${detail.message}`
                };
            });
            return res.status(400).json({statusCode : 400, errors });
        }

        const { name, email, password } = req.body;

        // Check if user already exists
        let userData = await User.findOne({ email });

        if (userData) {
            return res.status(200).json({ statusCode : 400, msg: 'Email already exist' });
        }

        //add user object
        userData = new User({
            name,
            email,
            password
        });

        //save user in mongoDB
        await userData.save();

        const token = jwt.sign({ userId: userData._id, name: userData.name }, process.env.JWT_SECRET, {
            expiresIn: '43200s',
        });
        // Find the user by ID and update token
        const user = await User.findByIdAndUpdate({ _id: userData._id }, { token }, { new: true });


        res.status(201).json({statusCode : 201, msg: 'User registered successfully', user });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// login controller 
exports.login = async (req, res) => {
    try {
        // Joi validation
        const { error, value } = loginSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
        if (error) {
            const errors = error.details.map(detail => {
                return {
                    field: detail.context.key,
                    message: `${detail.message}`
                };
            });
            return res.status(400).json({ errors });
        }

        const { email, password } = value; // Use the validated input values

        // Check if the user exists
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, {
            expiresIn: '43200s',
        });

        // Find the user by ID and update token
        const users = await User.findByIdAndUpdate({ _id: user._id }, { token }, { new: true });

        res.json({ statusCode : 200, msg: 'Login successful', user : users });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// logout controller
exports.logout = async(req, res) => {
    const token = req.token;
    const user = await User.findOne({ token });
    if(!user) {
        res.status(400).send({ message: "user logout" })
    } else {
        const updatedUser = await User.findByIdAndUpdate({_id : user._id}, { token : "" }, { new: true });
        res.status(400).send({statusCode : 200, message: "User logout" })
    }
}