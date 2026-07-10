const Header = () => {
const clickLogo= () => {
    alert("쇼핑몰에 오신 것을 환영합니다");
}

    return (
        <>
            <header className="header">
                <h1 onClick={clickLogo}>쇼핑몰🛒</h1>
            </header>
        </>
    )
}

export default Header