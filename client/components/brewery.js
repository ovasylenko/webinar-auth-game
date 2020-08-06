import React from 'react'
import axios from 'axios'

const GET_URL = (id) => `/api/v1/breweries/${id}`

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breweries: [],
      isLoading: false
    }
    // this.getBeer = this.getBeer.bind(this)
  }

  getBeer = () => {
    this.setState((s) => ({ isLoading: !s.isLoading }))
    axios(GET_URL(this.props.id)).then(({ data }) => {
      this.setState((s) => ({ breweries: data.data, isLoading: !s.isLoading }))
    })
  }

  componentDidMount() {
    if (this.props.id !== '') {
      this.getBeer()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getBeer()
    }
  }

  render() {
    if (this.state.isLoading) return 'Updating...'
    if (this.props.id === '') return 'No beer - No brewery'
    return (
      <h6>
        Hold my {this.state.breweries.map((it) => it.name).join(', ')} <br />
      </h6>
    )
  }
}

export default Root
