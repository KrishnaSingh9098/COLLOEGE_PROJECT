// import mongoose from "mongoose";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

// const userSchema = new mongoose.Schema({
//   userName: {
//     type: String,
//     minLength: [3, "Username must caontain at least 3 characters."],
//     maxLength: [40, "Username cannot exceed 40 characters."],
//   },
//   password: {
//     type: String,
//     selected: false,
//     minLength: [8, "Password must caontain at least 8 characters."],
//   },
//   email: String,
//   address: String,
//   phone: {
//     type: String,
//     minLength: [10, "Phone Number must caontain exact 10 digits."],
//     maxLength: [10, "Phone Number must caontain exact 10 digits."],
//   },
//   profileImage: {
//     public_id: {
//       type: String,
//       required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },
//   },
//   paymentMethods: {
//     bankTransfer: {
//       bankAccountNumber: String,
//       bankAccountName: String,
//       bankName: String,
//     },
//     RazorPay: {
//       rajorPayAccountNuber: Number,
//     },
//     paypal: {
//       paypalEmail: String,
//     },
//   },
//   role: {
//     type: String,
//     enum: ["Auctioneer", "Bidder", "Super Admin"],
//   },
//   unpaidCommission: {
//     type: Number,
//     default: 0,
//   },
//   auctionsWon: {
//     type: Number,
//     default: 0,
//   },
//   moneySpent: {
//     type: Number,
//     default: 0,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = bcryptjs.hash(this.password, 10);
// });

// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcryptjs.compare(enteredPassword, this.password);
// };

// userSchema.methods.generateJsonWebToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// export const User = mongoose.model("User", userSchema);
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const userSchema = new mongoose.Schema({
//   userName: {
//     type: String,
//     minLength: [3, "Username must contain at least 3 characters."],
//     maxLength: [40, "Username cannot exceed 40 characters."],
//   },
//   password: {
//     type: String,
//     select: false, // ✅ fix typo (was `selected`)
//     minLength: [8, "Password must contain at least 8 characters."],
//   },
//   email: String,
//   address: String,
//   phone: {
//     type: String,
//     minLength: [10, "Phone Number must contain exactly 10 digits."],
//     maxLength: [10, "Phone Number must contain exactly 10 digits."],
//   },
//   profileImage: {
//     public_id: { type: String, required: true },
//     url: { type: String, required: true },
//   },
//   paymentMethods: {
//     bankTransfer: {
//       bankAccountNumber: String,
//       bankAccountName: String,
//       bankName: String,
//     },
//     RazorPay: {
//       rajorPayAccountNuber: Number,
//     },
//     paypal: {
//       paypalEmail: String,
//     },
//   },
//   role: {
//     type: String,
//     enum: ["Auctioneer", "Bidder", "Super Admin"],
//   },
//   unpaidCommission: { type: Number, default: 0 },
//   auctionsWon: { type: Number, default: 0 },
//   moneySpent: { type: Number, default: 0 },
//   createdAt: { type: Date, default: Date.now },
// });

// // ✅ Password hashing before saving
// userSchema.pre("save", async function  (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // ✅ Password comparison
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // ✅ JWT token generation
// userSchema.methods.generateJsonWebToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// export const User = mongoose.model("User", userSchema);
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    minLength: [3, "Username must contain at least 3 characters."],
    maxLength: [40, "Username cannot exceed 40 characters."],
    required: true,
  },
  password: {
    type: String,
    select: false,
    minLength: [8, "Password must contain at least 8 characters."],
    required: true,
  },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone: {
    type: String,
    minLength: [10, "Phone Number must contain exactly 10 digits."],
    maxLength: [10, "Phone Number must contain exactly 10 digits."],
    required: true,
  },
  profileImage: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  paymentMethods: {
    bankTransfer: {
      bankAccountNumber: String,
      bankAccountName: String,
      bankName: String,
    },
    RazorPay: {
      razorPayAccountNumber: Number,
    },
    paypal: {
      paypalEmail: String,
    },
  },
  role: {
    type: String,
    enum: ["Auctioneer", "Bidder", "Super Admin"],
    required: true,
  },
  unpaidCommission: { type: Number, default: 0 },
  auctionsWon: { type: Number, default: 0 },
  moneySpent: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// 🔒 Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Password compare
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔐 Generate JWT
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
