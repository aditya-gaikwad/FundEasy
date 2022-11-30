import React from 'react';
import Layout from '../../../src/layout.js';
import {Button,Grid,Table} from 'semantic-ui-react';
import {Link} from '../../../routes.js';
import Campiagn from '../../../ethereum/campiagn.js';
import RequestRow from '../../../src/requestRow.js';
function requestIndex(props){
  const {address,requests,requestCount}=props;
  const {Header,Body,HeaderCell,Row,Cell}=Table;
  function renderRows(){
    const rows=requests.map((ele,index)=>{
      return (
        <RequestRow
          key={index}
          address={address}
          request={ele}
          id={index}
          approversCount={props.approversCount}
        />
      );
    });
    return rows;
  }
  return (
    <Layout>
    <h3>List of Request</h3>

    <Grid>
    <Grid.Row>
    <Grid.Column>
    <Link route={`/Campiagns/${props.address}/requests/new`}>
    <a>
    <Button floated='right' style={{marginBottom:10}} primary>Add request</Button>
    </a>
    </Link>
    </Grid.Column>
    </Grid.Row>
    <Grid.Row>
    <Grid.Column>
     <Table>
     <Header>
     <Row>
     <HeaderCell>ID</HeaderCell>
     <HeaderCell>Description</HeaderCell>
     <HeaderCell>Ammount</HeaderCell>
     <HeaderCell>Receipient</HeaderCell>
     <HeaderCell>ApprovalCount</HeaderCell>
     <HeaderCell>Approve</HeaderCell>
     <HeaderCell>Finalize</HeaderCell>
     </Row>
     </Header>
     <Body>
       {renderRows()}
     </Body>
     </Table>
    </Grid.Column>
    </Grid.Row>
    <Grid.Row>
    <Grid.Column>
    Found {props.requestCount} requests
    </Grid.Column>
    </Grid.Row>
    </Grid>
  
    </Layout>
  );
}
requestIndex.getInitialProps = async (ctx) => {

const campiagn=Campiagn(ctx.query.address);

const requestCount= await campiagn.methods.getRequestCount().call();
const requests=await Promise.all(
  Array(parseInt(requestCount)).fill().map((ele,index)=>{
    return campiagn.methods.requests(index).call();
  })
);
const approversCount=await campiagn.methods.approversCount().call();
  return {address:ctx.query.address,requests,requestCount,approversCount};
}

export default requestIndex;
