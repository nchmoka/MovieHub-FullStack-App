const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rule: {
        type: String,
        default: "user",
    },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
    // validation
    if (!email || !password) {
        throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
        throw Error("Email not valid");
    }
    // TODO: add password is strong enough validation maybe later on maybe not
    // if (!validator.isStrongPassword(password)) {
    //     throw Error("Password not strong enough");
    // }
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // we can add admin manually by changing the rule to "admin" and after adding the user to change it back to "user"
    const user = await this.create({ email, password: hash, rule: "user" });
    return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);
