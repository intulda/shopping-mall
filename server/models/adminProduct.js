const mongoose = require('mongoose');
const Schema = mongoose.Schema
const adminProductSchema = mongoose.Schema({
   writer : {       // 글쓴이
       type :  Schema.Types.ObjectId ,         
       ref : 'User'
   },
   title : {        // 글제목
       type : String,
       maxlength : 50
   },
   description : {  // 설명
       type : String
   },
   images : {       // 이미지
       type : Array ,
       default : []
   }, 
   Date : {         // 현재날짜
       type : Date 
   },
   sizeInfo : {     // 사이즈 정보
       type : Array,
       default : []
   }
})


const adminProduct = mongoose.model('adminProduct', adminProductSchema);

module.exports = { adminProduct }