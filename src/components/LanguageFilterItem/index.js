import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, showData} = props
  const {id, language} = languageDetails
  const classname = isActive ? 'active-list-item' : 'list-item'
  const onClickLanguage = () => {
    showData(id)
  }
  return (
    <>
      <li className={classname} onClick={onClickLanguage}>
        {language}
      </li>
    </>
  )
}

export default LanguageFilterItem
