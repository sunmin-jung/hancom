const Tag = ({tag}) => {
    return (
        <div>
            {tag.map ((tag) => (
                <span key={tag}>{'#' + tag}</span>
            ))}
        </div>
    )
}

export default Tag