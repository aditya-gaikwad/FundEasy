import React,{useState} from 'react';
import Layout from '../../../src/layout.js';
import {Form,Input,Button,Grid,Message} from 'semantic-ui-react';
import Campiagn from '../../../ethereum/campiagn.js';
import {Link,Router} from '../../../routes.js';
import web3 from '../../../ethereum/web3.js';
function newRequest(props){
  const {address}=props;
  let [val,setVal]=useState('');
  let [desc,setDesc]=useState('');
  let [rec,setRec]=useState('');
  let [err,setErr]=useState('');
  let [load,setLoad]=useState(false);
  return (
    <Layout>
    <h3>Create New Request(only for manager)</h3>
    <Grid>
    <Grid.Row>
    <Grid.Column>
    <Form error={!!err}
     onSubmit={async (event)=>{
      event.preventDefault();
      const campiagn=Campiagn(props.address);
      setLoad(true);
      setErr('');
      try{
        const accounts= await web3.eth.getAccounts();
        await campiagn.methods.createRequest(desc,web3.utils.toWei(val,'ether'),rec).send({
         from:accounts[0]
        });
        Router.replaceRoute(`/Campiagns/${address}/requests`);
      }catch(err){
        setErr(err.message);
      }
       setLoad(false);
       setVal('');
       setDesc('');
       setRec('');
     }}
    >
    <Form.Field>
    <label>Description:</label>
    <Input value={desc} onChange={(event)=>{
        setDesc(event.target.value);
    }
    } placeholder='purpose of request' />
    </Form.Field>
    <Form.Field>
    <label>Value in Ether:</label>
    <Input value={val} onChange={(event)=>{
        setVal(event.target.value);
    }
    } label='ether' labelPosition='right' placeholder='enter ammount in ether' />
    </Form.Field>
    <Form.Field>
    <label>Receipient:</label>
    <Input value={rec} onChange={(event)=>{
        setRec(event.target.value);
    }
    } placeholder='Receipient address' />
    </Form.Field>
    <Form.Field>
    <Button loading={load} primary type='submit'>Create!</Button>
    <Message error header='Oops!' content={err} />
    </Form.Field>
    </Form>
    </Grid.Column>
    </Grid.Row>
    </Grid>
    </Layout>
  );
}
newRequest.getInitialProps = (ctx) => {

  return {address:ctx.query.address};
}
export default newRequest;
