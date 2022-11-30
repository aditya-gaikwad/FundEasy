import React, { useEffect } from 'react'
import { Card, Button } from 'semantic-ui-react'
import factory from '../ethereum/factory.js'
import Layout from '../src/layout.js'
import { Link } from '../routes.js'
function home(props) {
  function renderCampaigns() {
    const items = props.Campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/Campiagns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      }
    })
    return <Card.Group items={items} />
  }

  return (
    <div>
      <Layout>
        <h3>Open Campaigns</h3>
        <Link route="/Campiagns/new">
          <a>
            <Button
              className="item"
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>

        {renderCampaigns()}
      </Layout>
    </div>
  )
}

home.getInitialProps = async (ctx) => {
  const Campaigns = await factory.methods.getDeployedCampaigns().call()
  return { Campaigns }
}
export default home

// import React, { Component } from 'react';
// import factory from '../ethereum/factory.js';

// class CampaignIndex extends Component {
//     static async getInitialProps() {
//       const campaigns = await factory.methods.getDeployedCampaigns().call();

//         return { campaigns };
//     }

//     render() {
//         return <div>{this.props.campaigns[0]}</div>
//     }
// }

// export default CampaignIndex;
