const express = require('express')
const router = express.Router();
const PostController = require('../controler/PostController');

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/')
    },
    filename: function (req, file, cb) {
        let name = Date.now() + file.originalname
        cb(null, name)
    }
})


const upload = multer({ storage: storage })

router.post('/register', PostController.register)

router.get('/verifyEmail', PostController.verifyEmail)

router.post('/loginUser', PostController.loginUser)

router.post('/getUserByToken', PostController.getUserByToken)

router.post('/uploadPicUrl', upload.single("picture"), PostController.uploadPicUrl)

router.post('/addProductPicture', upload.single("picture"), PostController.addProductPicture)

router.post('/addNewProduct', PostController.addNewProduct)

router.post('/category', PostController.getCategories)


router.post('/allProduct', PostController.allProduct)

router.post('/allProductByUserId', PostController.allProductById)

router.post('/getProductById', PostController.getProductById)

router.post('/wishListByUserId', PostController.wishlist)

router.post('/cartByUserId', PostController.cartByUserId)

router.post('/deleteProductByUserId', PostController.deleteProductByUserId)

router.post('/deleteWishListByUserId', PostController.deleteWishListByUserId)

router.post('/deleteCartByUserId', PostController.deleteCartByUserId)

router.post('/addWishList', PostController.addWishList)

router.post('/addToCart', PostController.addToCart)

router.post('/plusToCart', PostController.plusToCart)

router.post('/minusToCart', PostController.minusToCart)
router.post('/allUser', PostController.allUser)

module.exports = router


