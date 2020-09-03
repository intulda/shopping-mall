import React, { useState } from 'react'
import { Form, Input, Select  } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;


function AdminUploadProductPage(props)  {

    const [Title, setTitle] = useState("")                       // 글제목
    const [Description, setDescription] = useState("")           // 설명
    const [LeftSize, setLeftSize] = useState("")                 // 사이즈 정보
    const [RightSize, setRightSize] = useState("")               // 사이즈 정보  
    const {Images , setImages} = useState([]);

    // 이건 일단패스
    const validationCheck = {
        validate1 : false , 
        validate2 : false , 
        validate3 : false , 
        validate4 : false 
    }

    const sizeArray = [];
    for(let i = 0; i < 40; i++ ){
        sizeArray.push({"key" : i});
    }

     // 글제목 변경
    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    // 설명 변경
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

     // 왼쪽 사이즈 정보 변경
    const leftSizeChangeHandler = (value) => { debugger;
        setLeftSize(value);
    }
    
    // 오른쪽 사이즈 정보 변경
    const rightSizeChangeHandler = (value) => {
        setRightSize(value);
    }

    // 이미지 정보 변경
    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => { debugger;
        event.preventDefault();

        const date = new Date(); 
        const year = date.getFullYear(); 
        let month = new String(date.getMonth()+1); 
        let day = new String(date.getDate()); 

        // 한자리수일 경우 0을 채워준다. 
        if(month.length == 1){ 
            month = "0" + month; 
        } 
        if(day.length == 1){ 
            day = "0" + day; 
        } 
        const currentDate = year + month + day;

        if(!Title){
            alert("글제목은 필수 입력입니다. ");
            validationCheck.validate1 = false;
            return false;
       
        }else if(!Description){
            alert("설명은 필수 입력입니다. ");
            return false;
       
        }else if(!LeftSize){
            alert("왼쪽 사이즈는 필수 입력입니다. ");
            return false;
       
        }else if(!RightSize){
            alert("오른쪽 사이즈는 필수 입력입니다. ");
            return false;
       
        }else if(Images.length === 0){
            alert("이미지는 필수 입력입니다. ");
            return false;
        }
        
        //서버에 채운 값들을 request로 보낸다.

        const body = {
            //로그인 된 사람의 ID 
            writer : props.user.userData._id ,
            title : Title , 
            description : Description , 
            images : Images , 
            date : currentDate ,
            leftSize : LeftSize ,
            rightSize : RightSize
        }
        /*
        Axios.post('/api/product', body)
            .then(response => {
                if (response.data.success) {
                    alert('상품 업로드에 성공 했습니다.')
                    props.history.push('/')
                } else {
                    alert('상품 업로드에 실패 했습니다.')
                }
            })
            */
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2> 옷 업로드</h2>
            </div>

            <Form onSubmit={submitHandler}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>글제목</label>
                <Input onChange={titleChangeHandler} value={Title} style={{ width: 120}} 
                     className={validationCheck.validate1 ? 'success' : 'failure'} />
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>왼쪽 사이즈</label>
                <br />
                <Select defaultValue="22" style={{ width: 120 }} onChange={leftSizeChangeHandler} value={LeftSize}>
                  {sizeArray.map(item => (
                        <Option key={item.key} value={item.key}> {item.key}</Option>
                    ))}
                </Select>
                <br />
                <br />
                <label>오른쪽 사이즈</label>
                <br />
                <Select defaultValue="22" style={{ width: 120 }} onChange={rightSizeChangeHandler} value={RightSize}>
                  {sizeArray.map(item => (
                        <Option key={item.key} value={item.key}> {item.key}</Option>
                    ))}
                </Select>
                <br />
                <br />
                <button type="submit">
                    확인
                </button>
            </Form>


        </div>
    )
}

export default AdminUploadProductPage