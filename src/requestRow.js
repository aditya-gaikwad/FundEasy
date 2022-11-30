import React from 'react';
import {Table,Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3.js';
import Campiagn from '../ethereum/campiagn.js';
import {Router} from '../routes.js';
function requestRow(props){

  const {Row,Cell}=Table;
  const {address,request,id,approversCount}=props;
  const readyToFinilize=request.approvalCount>(approversCount/2);
  return (
    <Row disabled={request.complete} positive={readyToFinilize && !request.complete}>
      <Cell>{id}</Cell>
      <Cell>{request[0]}</Cell>
      <Cell>{web3.utils.fromWei(request.value,'ether')}</Cell>
      <Cell>{request[2]}</Cell>
      <Cell>{request[4]}/{approversCount}</Cell>
      <Cell>
      { request.complete?null:(
       <Button color='green' Basic
        onClick={async ()=>{
         const campiagn=Campiagn(address);
         const accounts=await web3.eth.getAccounts();
         await campiagn.methods.approveRequest(id).send({
           from:accounts[0]
         });
        Router.replaceRoute(`/Campiagns/${address}/requests`);
        }}
       >Approve</Button>
     )
     }
      </Cell>
      <Cell>
      {request.complete?null:(
       <Button color='teal' Basic
        onClick={async ()=>{
         const campiagn=Campiagn(props.address);
         const accounts=await web3.eth.getAccounts();
         await campiagn.methods.finalizeRequest(id).send({
           from:accounts[0]
         });
        }}
       >Finilize</Button>)
     }
      </Cell>
    </Row>
  );
}
export default requestRow ;
