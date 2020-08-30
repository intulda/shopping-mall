const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Product} = require('../models/Product')

//=================================
//            Product
//=================================
var storage = multer.diskStorage({
    // 어디에 파일이 저장이 되는지
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    // 어떤 이름으로 저장할건지
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
  var upload = multer({ storage: storage }).single('file')

router.post('/image', (req, res) => {

    // 가져온 이미지를 저장을 해주면 된다.
    upload(req, res ,err => {
        if(err){
            return res.json({success: false , err})
        }
        console.dir("res.req.file  : "+res.req.file);
        return res.json({success: true, filePath : res.req.file.path , fileName : res.req.file.filename});
    })
})

router.post('/', (req, res) => {

    // 받아온 정보들을 DB에 넣어준다.
    const product = new Product(req.body);

    product.save((err) => {
      if(err)   return res.status(400).json({success : false , err});
      return res.status(200).json({success : true})
    });
})

router.post('/products', (req, res) => {

  // product collection에 들어 있는 모든 상품 정보를 가져오기
  Product.find()
    .populate("writer") // populate 등록한 사람에 대한 이름 이미지 이메일주소 가 필요해서 사용
    .exec((err, productInfo) => {
        if(err)   return res.status(400).json({success : false ,err });
        return res.status(200).json({success : true, productInfo})
    })
})


module.exports = router;
