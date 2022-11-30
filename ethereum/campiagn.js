import web3 from './web3.js';
import Campiagn from './build/Campaign.json';

function campiagn(address)
{
  const instance=  new web3.eth.Contract(JSON.parse(Campiagn.interface),address);
  return instance;
}
export default campiagn;
