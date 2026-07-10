import { useState } from 'react'

const ProductItem = ({name}) => {
    const [count, setCount] = useState(0)
    return(
        <div style={{border: '1px solid gray',padding: '16px', borderRadius: '8px'}}>
            <div className='product'>
                <h3>{name}</h3>
                <p>{count}개 담음</p>

            </div>
            <button onClick={() => setCount(c => c+1)}
            style={{backgroundColor: '#e2dad4', color:'black'}} >🛒 담기</button>
        </div>
    )
}
export default ProductItem