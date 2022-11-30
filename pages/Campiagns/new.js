import React,{useState}from 'react';
import {Form,Button,Input,Message} from 'semantic-ui-react';
import Layout from '../../src/layout.js';
import factory from '../../ethereum/factory.js';
import web3 from '../../ethereum/web3.js';
import {Router} from '../../routes.js';
function createCampaign() {
  let [min,setMin]=useState('');
  let [err,setErr]=useState('');
  let [loading,setLoad]=useState(false);
  return (
    <Layout>
    <h3>Create Campaign</h3>

    <Form error={!!err} onSubmit={async (event)=>{
     event.preventDefault();
     setLoad(true);
     setErr('');
     try{
       const accounts=await web3.eth.getAccounts();
       await factory.methods.createCampaign(min).send({
         from :accounts[0]
       });
       setErr('');
       Router.pushRoute('/');
     }catch(err){
        setErr(err.message);
     }
     setLoad(false);
   }
 }
    >
    <Form.Field>

      <Input
      onChange={(event)=>{
        setMin(event.target.value);
      }}
      value={min}
      label='wei' labelPosition='right' placeholder='minimum Contribution' />
      </Form.Field>
      <Button  type='submit'primary loading={loading}>Create!</Button>
      <Message error header='Oops!' content={err}/>
    </Form>

    </Layout>
  );
}
export default createCampaign;
