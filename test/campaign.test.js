const assert = require('assert');
const Web3 = require('web3');
const ganache= require('ganache-cli');
const mocha = require('mocha');
const comipledFactory = require('../ethereum/build/CampaignFactory.json');
const comipledCampaign = require('../ethereum/build/Campaign.json');

const web3=new Web3(ganache.provider());


let factory;
let accounts;
let campaignAddress;
let campaign;
beforeEach(async()=>{
  accounts= await web3.eth.getAccounts();

    factory=await new web3.eth.Contract(JSON.parse(comipledFactory.interface))
     .deploy({data:comipledFactory.bytecode})
    .send({from:accounts[0],gas:'1000000',gasPrice:'5000000'})
     await factory.methods.createCampaign('100').send(
       {from:accounts[0],
       gas:'1000000',
       gasPrice:'5000000'
     }
     );
     [campaignAddress]=await factory.methods.getDeployedCampaigns().call({
       from:accounts[0]
     });

     campaign=await new web3.eth.Contract(JSON.parse(comipledCampaign.interface),campaignAddress);
});


describe('campaigns',()=>{
  it('SuccessfullDeployment',()=>{
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
  it('checking manager',async ()=>{
    const manager= await campaign.methods.manager().call({
      from:accounts[0]
    });
    assert.equal(accounts[0],manager);
  });
  it('contribute',async ()=>{
    await campaign.methods.contribute().send({
      from:accounts[1],
      value:'200'
    });
    let isContributor= await campaign.methods.approvers(accounts[1]);
    assert(isContributor);
  });
  it('minimum contribution',async ()=>{
    try{
      await campaign.methods.contribute().send({
        from:accounts[1],
        value:'100'
      });
      assert(false);
    }catch(err){
      assert(err);
    }

  });


  it('manager can make reqeust',async()=>{
     await campaign.methods.createRequest('buy milk','150',accounts[1]).send({
       from:accounts[0],
       gas:'1000000',
       gasPrice:'5000000000'
     });
     const req=await campaign.methods.requests(0).call();
     assert.equal('buy milk',req.description);
  });
it('end to end test',async ()=>{
  await campaign.methods.contribute().send({
    from:accounts[0],
    value:web3.utils.toWei('10','ether'),
    gas:'1000000',
    gasPrice:'5000000000'
  });
  await campaign.methods.createRequest('buy milk',web3.utils.toWei('5','ether'),accounts[1]).send({
    from:accounts[0],
    gas:'1000000',
    gasPrice:'5000000000'
  });
  await campaign.methods.approveRequest(0).send({
    from:accounts[0],
    gas:'1000000',
    gasPrice:'5000000000'
  });

await campaign.methods.finalizeRequest(0).send({
  from:accounts[0],
  gas:'1000000',
  gasPrice:'5000000000'
});
let bal=await web3.eth.getBalance(accounts[1]);
bal=web3.utils.fromWei(bal,'ether');
bal=parseFloat(bal);

assert(bal>104);
});

});
