import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { GC_USER_ID } from '../constants'
import { ALL_LINKS_QUERY } from './LinkList'


class CreateLink extends Component {

  state = {
    description: '',
    url: ''
  }

  render() {
    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            placeholder='A description for the link'
          />
          <input
            className='mb2'
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type='text'
            placeholder='The URL for the link'
          />
        </div>
        <button
          onClick={() => this._createLink()}
        >
          Submit
        </button>
      </div>
    )
  }


_createLink = async () => {
  const postedById = localStorage.getItem(GC_USER_ID)
  if (!postedById) {
    console.error('No user logged in')
    return
  }
  const { description, url } = this.state
  //NOTE: that this name 'createLinkMutation' matched with the export default
  //NOTE: Apollo is injecting a function into the components props
  await this.props.createLinkMutation({
  variables: {
    description,
    url,
    postedById
  },
  update: (store, { data: { createLink } }) => {
    const data = store.readQuery({ query: ALL_LINKS_QUERY })
    data.allLinks.splice(0,0,createLink)
    store.writeQuery({
      query: ALL_LINKS_QUERY,
      data
    })
  }
})

  this.props.history.push(`/`)
}

}
// 1. It stores the mutation
const CREATE_LINK_MUTATION = gql`
  # 2. You define the actual mutation with the two necesary arguments
  mutation CreateLinkMutation($description: String!, $url: String!, $postedById: ID!) {
    createLink(
      description: $description,
      url: $url,
      postedById: $postedById
    ) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
    }
  }
`

// 3 A function called 'createLinkMutation' will be injected
export default graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation' })(CreateLink)
