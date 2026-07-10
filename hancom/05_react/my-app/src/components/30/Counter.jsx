import { useState } from "react";

const Counter =() => {
    const [count, setCount] = useState(0)
    return(
        <>
        <button onClick={()=> setCount(c => c-1)}>-1</button>
        <span>{count}</span>
        <button onClick={() => setCount(c => c + 1)}>+1</button>
        </>
    )
}

export default Counter