
import User from "../model/user.model.js";
// Register Route
const register =( async (req, res) => {
    const { firstname, lastname, email, phonenumber, password } = req.body;
    console.log(req.body);

    // Check if all fields are provided
    if (!firstname || !lastname || !email || !phonenumber || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        // Check if email or phone number already existsss
        const existingUser = await User.findOne({ 
            $or: [{ email }, { phoneNumber: phonenumber }] 
        });
        
        if (existingUser) {
            const errorField = existingUser.email === email ? "Email" : "Phone number";
            return res.status(400).json({ message: `${errorField} already exists` });
        }

        // Create and save the new user
        const newUser = new User({
            firstName: firstname,
            lastName: lastname,
            phoneNumber: phonenumber,
            email,
            password,
        });

        await newUser.save();
  
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}); 


// for login 
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User email is not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        return res.status(200).json({ message: "Successfully logged in" });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export {register,login}   

