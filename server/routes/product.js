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
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0; 
  let term = req.body.searchTerm 

  console.log("limit : "+limit +", skip : "+skip);

  let findArgs = {};

  for(let key in req.body.filters){
    
    if(req.body.filters[key].length > 0){

        if(key === "price"){
          findArgs[key] = {
             // Grater Than equals
             $gte : req.body.filters[key][0],     // 몽고디비에서 이것보다 크거나 같은
             // less than equals
             $lte : req.body.filters[key][1],     // 몽고디비에서 이것보다 같거나 같은
          }
        }else{
           findArgs[key] = req.body.filters[key];
        }
        
    }
  }

  console.log('findArgs',findArgs);

  if(term){
    Product.find(findArgs)
      // 조회하고싶은 거에 대해서
      .find({ $text : { $search: term}})
      .populate("writer") // populate 등록한 사람에 대한 이름 이미지 이메일주소 가 필요해서 사용
      .skip(skip)     // 처음은  0번째
      .limit(limit)   // 몇개가져올지 8개
      .exec((err, productInfo) => {
          if(err)   return res.status(400).json({success : false ,err });
          return res.status(200).json({
            success : true, productInfo, 
            postsize : productInfo.length})
    })
  }else{
    Product.find(findArgs)
      .populate("writer") // populate 등록한 사람에 대한 이름 이미지 이메일주소 가 필요해서 사용
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
          if(err)   return res.status(400).json({success : false ,err });
          return res.status(200).json({
            success : true, productInfo, 
            postsize : productInfo.length})
    })
  }

})

// id=12421421, 1412412, 1412412  type = array
router.get('/products_by_id', (req, res) => {

  // 항상 post 는 바디 get 은 query
  let type = req.query.type;
  let productIds = req.query.id;
  
  if(type === "array"){
    // id=12421421, 1412412, 1412412 이거를
    // productIds = [12421421, 1412412, 1412412 ] 이런식으로 바꿔주기
    let ids = req.query.id.split(",");
    productIds = ids.map(item => {
      return item;
    })
  }
  // productId를 이용해서 DV 에서 productId와 같은 상품을 가져온다.
  Product.find({_id: {$in : productIds}})
    .populate('writer')
    .exec((err, product) => {
        if(err)   return res.status(400).send(err);
        return res.status(200).send(product)
    })
 
})



module.exports = router;
