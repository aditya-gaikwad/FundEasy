import React,{useState}from 'react';
import Layout from '../../src/layout.js';
import {Container,Card,Grid,Button} from 'semantic-ui-react';
import Campiagn from '../../ethereum/campiagn.js';
import web3 from '../../ethereum/web3.js';
import {Link} from '../../routes.js';
import ContributeForm from '../../src/contributeform.js';
function show(props){
 const {balance,minimumContribution,manager,requestCount,approversCount}=props;
  function renderSummary(){
    const items=[{
      header:manager,
      meta:"This is manager's address",
      description:'manger is handler of the campiagn',
      style:{overflowWrap:'break-word'}
    },{
      header:minimumContribution,
      meta:'Atleast this ammount of money should be donated',
      description:'Donate money greater than this'
    },{
      header:web3.utils.fromWei(balance,'ether'),
      meta:'currnt balance',
      description:'This ammount of ether is tied to cnotract'
    },{
      header:approversCount,
      meta:'Number of approvers',
      description:'Currently these many people donated to campiagn'
    },{
      header:requestCount,
      meta:' Number of requests ',
      description:'These are numbers of request for this campiagn'
    }];
    return (
      <Card.Group items={items} />
    );
  }

return (


<Layout>
  <h3>Campiagn info</h3>
  <Grid>
  <Grid.Row>
   <Grid.Column width={10} >
     {renderSummary()}
   </Grid.Column>
   <Grid.Column width={6}>
      <ContributeForm address={props.address}/>
   </Grid.Column>
   </Grid.Row>
   <Grid.Row>
    <Grid.Column  >
      <Link route={`/Campiagns/${props.address}/requests`}>
      <a><Button primary>View Request</Button></a>
      </Link>
    </Grid.Column>
    </Grid.Row>
  </Grid>


  </Layout>

);
}
show.getInitialProps = async  (ctx) => {
const campiagn=Campiagn(ctx.query.address);
const summary= await campiagn.methods.getSummary().call();

  return {

    minimumContribution:summary[0],
    balance:summary[1],
    requestCount:summary[2],
    approversCount:summary[3],
    manager:summary[4],
    address:ctx.query.address
  };
}
export default show;
