import User from '../model/user.js';
import { genPassword } from '../passportUtils.js';

export const userLogIn = async (req, res) => {
    if (req.user) {
        return res.status(200).json(`login successfull`);
    }
    else {
        return res.status(401).json('Invalid Login');
    }
}

export const userSignUp = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            console.log({existingUser})
            return res.status(400).json("user already exists");
        }
        const saltHash = genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        const newUser = new User({
            ...req.body,
            password: hash,
            salt: salt
        });



        newUser.save()
            .then((user) => {
                res.json({ message: "user logged in successfully" });
            });
    } catch (err) {
        res.json('Error: ', err.message);

    }
}
export const userLogout = (req, res) => {
    req.logout();
    res.json({ message: "user logged out successfully" });

}
