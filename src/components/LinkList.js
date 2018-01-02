import React, { Component } from 'react'
import Link from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LinkList extends Component {

  render() {
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
   return <div>Loading</div>
 }

 if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
    return <div>Error</div>
  }


  const linksToRender = this.props.allLinksQuery.allLinks

 return (
   <div>
     {linksToRender.map(link => (
       <Link key={link.id} link={link}/>
     ))}
   </div>
 )

}//render

}//component

// 1
const ALL_LINKS_QUERY = gql`
  # 2
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`

// 3
export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' }) (LinkList)
