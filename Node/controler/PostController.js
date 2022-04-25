
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { Category } = require("../model/category");
const { Product } = require("../model/product");
const { User } = require("../model/user");
const nodemailer = require('nodemailer');
const { Product_picture } = require("../model/product_picture");
const { Wishlist } = require("../model/wishlist")
const { Cart } = require("../model/cart")
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yuriaroyan91@gmail.com',
    pass: '959177MarYur'
  }
});



class PostController {
  static async register(req, res) {
    const us = await User.findOne({ where: { email: req.body.email } })
    if (us) {
      res.send({ error: "email has already" });
    } else {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const token = uuid.v4();
      const mailOptions = {
        from: 'yuriaroyan91@gmail.com',
        to: req.body.email,
        subject: 'Welcome to my shop',
        html: `
        <h1>Hi my dear ${req.body.name}</h1>
        <a href="http://localhost:8080/verifyEmail?email=${req.body.email}&token=${token}">verify</a>
        `
      };
      transporter.sendMail(mailOptions, async function (error, info) {
        // if (error) {
        //   console.log(error);
        //   res.send({ error: "email invalid" });
        // } else {
        //   console.log('Email sent: ' + info.response);
        // }
      });
      await User.create({ ...req.body, password: hash, token });
      res.send({ status: "ok" });
    }
  }

  static async verifyEmail(req, res) {
    const us = await User.findOne({ where: { email: req.query.email, token: req.query.token } })
    if (us) {
      await User.update({ verify: 1, token: null }, { where: { email: req.query.email } })
      res.send({ status: "ok" })
    } else {
      res.send({ error: "invalid" })
    }

  }

  static async loginUser(req, res) {
    const us = await User.findOne({ where: { email: req.body.email } })
    if (us) {
      if (bcrypt.compareSync(req.body.password, us.dataValues.password)) {
        if (us.dataValues.verify == 1) {
          const token = uuid.v4();
          await User.update({ token }, { where: { email: req.body.email } })
          res.send({ token })
        } else {
          res.send({ error: "verify email" })
        }
      } else {
        res.send({ error: "password invalid" })
      }
    } else {
      res.send({ error: "email invalid" })
    }
  }

  static async getUserByToken(req, res) {
    const us = await User.findOne({ where: { token: req.body.token } })
    if (us) {
      const token = uuid.v4();
      await User.update({ token }, { where: { id: us.dataValues.id } })
      res.send({ ...us.dataValues, token })
    } else {
      res.send({ error: "token invalid" })
    }
  }

  static async uploadPicUrl(req, res) {
    console.log("req token", req.body)
    console.log("req file", req.file)
    const us = await User.findOne({ where: { token: req.body.token } })
    if (us) {
      await User.update({ pic_url: req.file.filename }, { where: { id: us.dataValues.id } })
      res.send({ status: "ok" })
    } else {
      res.send({ error: "token invalid" })
    }
  }

  static async addNewProduct(req, res) {
    const product = await Product.create(req.body);
    console.log("product", product)
    res.send({ status: "ok", id: product.dataValues.id })
  }
  static async addProductPicture(req, res) {
    await Product_picture.create({ productId: req.body.id, pic_url: req.file.filename });
    res.send({ status: "ok" })
  }

  static async getCategories(req, res) {
    console.log("hello cat")
    const cat = await Category.findAll({})
    console.log('cat =====>', cat)
    res.send(cat)
  }
  static async allProduct(req, res) {
    const allproduct = await Product.findAll({ include: [User, Product_picture] })
    res.send(allproduct)
  }
  static async allProductById(req, res) {
    const userId = await User.findOne({ where: { token: req.body.token } })
    if (userId) {
      let prod = await Product.findAll({ where: { userId: userId.dataValues.id }, include: [Product_picture] })
      res.send(prod)
    } else {
      res.send({ error: "token invalid" })
    }
  }
  static async getProductById(req, res) {
    const userId = await User.findOne({ where: { token: req.body.token } })
    if (userId) {
      let prod = await Product.findOne({ where: { id: req.body.id }, include: [User, Product_picture, Category] })
      res.send(prod)
    } else {
      res.send({ error: "token invalid" })
    }
  }
  static async wishlist(req, res) {
    const userId = await User.findOne({ where: { token: req.body.token } })
    if (userId) {
      let wishlist = await Wishlist.findAll({ where: { userId: userId.dataValues.id }, include: Product })
      res.send(wishlist)
    } else {
      res.send({ error: "token invalid" })
    }

  }
  static async cartByUserId(req, res) {
    const userId = await User.findOne({ where: { token: req.body.token } })
    if (userId) {
      let cart = await Cart.findAll({ where: { userId: userId.dataValues.id }, include: Product })
      res.send(cart)
    } else {
      res.send({ error: "token invalid" })
    }
  }
  static async deleteProductByUserId(req, res) {
    const userId = await User.findOne({ where: { token: req.body.token } })
    if (userId) {
      await Product.destroy({ where: { userId: userId.dataValues.id, id: req.body.id } })
      res.send({ status: "ok" })
    } else {
      res.send({ error: "token invalid" })
    }
  }
  static async deleteWishListByUserId(req, res) {
    const userId = await User.findOne({ where: { token: req.body.token } })
    if (userId) {
      await Wishlist.destroy({ where: { userId: userId.dataValues.id, id: req.body.id } })
      res.send({ status: "ok" })
    } else {
      res.send({ error: "token invalid" })
    }
  }
  static async deleteCartByUserId(req, res) {
    const userId = await User.findOne({ where: { token: req.body.token } })
    if (userId) {
      await Cart.destroy({ where: { userId: userId.dataValues.id, id: req.body.id } })
      res.send({ status: "ok" })
    } else {
      res.send({ error: "token invalid" })
    }
  }
  static async addWishList(req, res) {
    const userId = await User.findOne({ where: { token: req.body.token } })
    if (userId) {
      let w = await Wishlist.findOne({ where: { userId: userId.dataValues.id, postId: req.body.id } })
      if (!w) {
        await Wishlist.create({ where: { userId: userId.dataValues.id, postId: req.body.id } })
      }
      res.send({ status: "ok" })
    } else {
      res.send({ error: "token invalid" })
    }
  }
  static async addToCart(req, res) {
    const userId = await User.findOne({ where: { token: req.body.token } })
    if (userId) {
      let w = await Cart.findOne({ where: { userId: userId.dataValues.id, postId: req.body.id }, include: Product })
      if (!w) {
        await Cart.create({ where: { userId: userId.dataValues.id, postId: req.body.id, quantity: 1 } })
      } else {
        if (w.dataValues.quantity < w.product.count) {
          await Cart.update({ quantity: w.dataValues.quantity + 1 }, { where: { id: w.dataValues.id } })
        }
      }
      res.send({ status: "ok" })
    } else {
      res.send({ error: "token invalid" })
    }
  }
  static async plusToCart(req, res) {
    const userId = await User.findOne({ where: { token: req.body.token } })
    if (userId) {
      let w = await Cart.findOne({ where: { userId: userId.dataValues.id, postId: req.body.id }, include: Product })
      if (w) {

        if (w.dataValues.quantity < w.product.count) {
          await Cart.update({ quantity: w.dataValues.quantity + 1 }, { where: { id: w.dataValues.id } })
        }
        res.send({ status: "ok" })
      } else {
        res.send({ error: "product id invalid" })
      }
    } else {
      res.send({ error: "token invalid" })
    }
  }
  static async minusToCart(req, res) {
    const userId = await User.findOne({ where: { token: req.body.token } })
    if (userId) {
      let w = await Cart.findOne({ where: { userId: userId.dataValues.id, postId: req.body.id }, include: Product })
      if (w) {

        if (w.dataValues.quantity > 0) {
          await Cart.update({ quantity: w.dataValues.quantity - 1 }, { where: { id: w.dataValues.id } })
        } else {
          await Cart.destroy({ where: { userId: userId.dataValues.id, id: w.dataValues.id } })
        }
        res.send({ status: "ok" })
      } else {
        res.send({ error: "product id invalid" })
      }
    } else {
      res.send({ error: "token invalid" })
    }
  }
  static async allUser(req, res) {
    const userId = await User.findOne({ where: { token: req.body.token } })
    if (userId) {
      const alluser = await User.findAll({})
      console.log('alluser===>',alluser)
      res.send(alluser)
    } else {
      res.send({ error: "token invalid" })
    }
  }
}

module.exports = PostController;
