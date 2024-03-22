import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} =
    repositoryDetails
  return (
    <li className="card-container">
      <img src={avatarUrl} className="avatar-image" alt={name} />
      <p className="name-paragraph">{name}</p>
      <div className="flex-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars-image"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="flex-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars-image"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="flex-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stars-image"
        />
        <p>{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
