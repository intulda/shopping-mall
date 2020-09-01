import React ,{ useState, useEffect }from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props){
    
    const [Images, setImages] = useState([]);

    useEffect(() => { 
        if(props.detail.images && props.detail.images.length > 0){
            let images = [];

            props.detail.images.map(item => {
                images.push({
                    original : `http://localhost:5000/${item}` ,
                    thumbnail : `http://localhost:5000/${item}`
                })
            })
            setImages(images)
        }

    // []   이부분이 렌더링 되면 작동을 시키는데 이미지 부분에 
    // [[props.detail]] [props.detail] 이 바뀔때마다 라이프 사이클을 한번더 실행시켜줘라
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images}></ImageGallery>
        </div>
    )
}

export default ProductImage