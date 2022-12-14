import React, { useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import factory from '../ethereum/factory.js'
import Header from './header.js'
import Head from 'next/head'
function Layout(props) {
  return (
    <Container>
      <Head>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
      </Head>
      <Header />
      {props.children}
    </Container>
  )
}

export default Layout
