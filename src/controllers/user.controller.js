import db from "../database/db.connection.js"
import bcrypt from 'bcrypt'
import { addSession } from "../service/session.js"
import { userRegisterSchema, userLoginSchema } from "../validators/user.validate.js"
import { v4 as uuidv4 } from 'uuid';

const registerUser = async (req, res) => {

    try {
        const { error } = userRegisterSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { username, email, password } = req.body;

        const [existingUser] = await db.execute(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [username, email]
        );

        console.log(existingUser);

        if (existingUser.length > 0) {
            return res.status(409).json({
                message: "User with this email or username already exist.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            `INSERT INTO users (username, email, password) VALUES(?,?,?)`,
            [username, email, hashedPassword]
        );

        res.status(201).json({
            message: "User Created Successfully",
            result,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { error } = userLoginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = req.body;
        const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (user.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const sessionId = addSession({ id: user[0].id, username: user[0].username, email: user[0].email });

        res.cookie('sessionId', sessionId, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export { registerUser, loginUser };