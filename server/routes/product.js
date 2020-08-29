const express = require('express');
const router = express.Router();
const multer = require('multer');

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

module.exports = router;
