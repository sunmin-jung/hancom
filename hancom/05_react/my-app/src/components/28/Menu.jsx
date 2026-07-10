const Menu = ({setPage}) => {
    return (
        <>
            <nav className="menu">
                <ul>
                   <li onClick={() => setPage('홈')}>홈</li>
                <li onClick={() => setPage('상품')}>상품</li>
                <li onClick={() => setPage('공지사항')}>공지사항</li>
                <li onClick={() => setPage('문의하기')}>문의하기</li>
                    </ul></nav>
                
        </>
    )
}

export default Menu