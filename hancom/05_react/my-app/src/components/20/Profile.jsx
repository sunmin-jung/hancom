const Profile = ({job = "개발자", name= "정선민"}) => {
    return (
        <>
        <h2>{name}</h2>
        <p>{job}</p>
        </>
    )
}

export default Profile

