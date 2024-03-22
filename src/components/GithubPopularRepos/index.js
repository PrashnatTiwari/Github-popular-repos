import {Component} from 'react'

import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'

import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    apiStatus: apiStatusConstant.initial,
    dataList: [],
  }

  showData = id => {
    this.setState({
      activeId: id,
    })
  }

  componentDidMount() {
    this.getLanguageData()
  }

  getLanguageData = async () => {
    const {activeId} = this.state
    this.setState({
      apiStatus: apiStatusConstant.progress,
    })

    const response = await fetch(
      ` https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({
        dataList: fetchedData,
        apiStatus: apiStatusConstant.success,
      })
    }

    if (response.status === 401) {
      this.state({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderDataList = () => {
    const {dataList, activeId} = this.state
    return (
      <div className="bg-container">
        <h1>Popular</h1>
        <ul className="unordered-list-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              languageDetails={eachItem}
              isActive={activeId === eachItem.id}
              showData={this.showData}
            />
          ))}
        </ul>

        <ul className="unordered-list-data">
          {dataList.map(eachItem => (
            <RepositoryItem key={eachItem.id} repositoryDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => {
    const {activeId} = this.state
    return (
      <div className="bg-container">
        <h1>Popular</h1>
        <ul className="unordered-list-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              languageDetails={eachItem}
              isActive={activeId === eachItem.id}
              showData={this.showData}
            />
          ))}
        </ul>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-image"
        />
      </div>
    )
  }

  renderLoaderView = () => {
    const {activeId} = this.state
    return (
      <div className="bg-container">
        <h1>Popular</h1>
        <ul className="unordered-list-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              languageDetails={eachItem}
              isActive={activeId === eachItem.id}
              showData={this.showData}
            />
          ))}
        </ul>
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.progress:
        return this.renderLoaderView()
      case apiStatusConstant.success:
        return this.renderDataList()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default GithubPopularRepos
