import React,{useState} from 'react';
import {Form,Input,Button,Message} from 'semantic-ui-react';
import Campiagn from '../ethereum/campiagn.js';
import web3 from '../ethereum/web3.js';
import {Router} from '../routes.js';
function contributeForm(props){
let [val,setVal]=useState('');
let [err,setErr]=useState('');
let [loading,setLoad]=useState(false);
  return (
    <Form error={!!err}onSubmit={ async (event)=>{
      event.preventDefault();
      setLoad(true);
      setErr('');
      try{
        const campiagn=Campiagn(props.address);
        const accounts=await web3.eth.getAccounts();
        await campiagn.methods.contribute().send(
          {from:accounts[0],
          value:web3.utils.toWei(val,'ether')}
        );
        Router.replaceRoute(`/Campiagns/${props.address}`)
      }catch(err){
           setErr(err.message);
      }
      setLoad(false);
      setVal('');
    }}>
    <Form.Field>

    <Input value={val}  onChange={(event)=>{
      setVal(event.target.value)
    }} label='ether' labelPosition='right'  placeholder='Ammount to contribute'/>
    </Form.Field>
    <Form.Field>
    <Button loading={loading} type='submit'primary >contribute!</Button>
    </Form.Field>
    <Message error header="Opps!" content={err}/>
    </Form>
  );
}

export default contributeForm;
