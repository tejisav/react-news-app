import React from 'react'
import './css/App.css'
import axios from 'axios'
import Layout from './components/Layout'
import Results from './components/Results'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from '@material-ui/core';

let apiKey = "a4c76f4eab034a16a51489515137e2b9"

export default class App extends React.Component {

  state = {
    tabValue: "in",
    searchValue: "",
    fetchingNews: false,
    newsData: [],
    newsDataPage: 1,
    newsDataTotalResults: 0
  }

  componentDidMount() {
    this.fetchNews()
  }

  fetchNews = async () => {

    if (this.state.tabValue === 'search' && !this.state.searchValue) {
      this.setState({ 
        newsData: [],
        newsDataPage: 1,
        newsDataTotalResults: 0
      })
      return
    }

    let url = ""
    if (this.state.tabValue === "search") {
      url = `https://newsapi.org/v2/everything?q=${this.state.searchValue}&sortBy=publishedAt&pageSize=10&page=${this.state.newsDataPage}&apiKey=${apiKey}`
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${this.state.tabValue}&pageSize=10&page=${this.state.newsDataPage}&apiKey=${apiKey}`
    }

    this.setState({
      fetchingNews: true
    })

    try {
      const response = await axios.get(url);
      this.setState({
        newsData: response.data.articles,
        newsDataTotalResults: response.data.totalResults
      })
    } catch (error) {
      console.error(error);
    }

    this.setState({
      fetchingNews: false
    })
  }

  handleTabValueChange = async (event, value) => {
    await this.setState({
        tabValue: value
    })
    this.fetchNews()
  }

  handleSearchValueChange = (event) => {
    this.setState({
      searchValue: event.target.value
    })
  }

  handleSearchSubmit = async (event) => {
    event.preventDefault()

    await this.setState({
      tabValue: "search"
    })

    this.fetchNews()
  }

  handlePageChange = async (event, newPage) => {
    await this.setState({
      newsDataPage: newPage+1
    })

    this.fetchNews()
  }

  render() {
    return (
      <div className="App">
        <Layout tabValue={this.state.tabValue}
        handleTabValueChange={this.handleTabValueChange}
        handleSearchValueChange={this.handleSearchValueChange}
        handleSearchSubmit={this.handleSearchSubmit}
        >
          {this.state.fetchingNews &&
            <Container align="center">
              <CircularProgress />
            </Container>
          }
          
          {!this.state.fetchingNews && this.state.newsData &&
            <Results tabValue={this.state.tabValue} searchValue={this.state.searchValue} newsData={this.state.newsData} handlePageChange={this.handlePageChange} newsDataPage={this.state.newsDataPage} newsDataTotalResults={this.state.newsDataTotalResults}/>
          }
        </Layout>
      </div>
    )
  }
}