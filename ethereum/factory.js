import web3 from './web3.js';
import CampaignFactory from './build/CampaignFactory.json';


const instance=  new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),'0xcA456194e05B037d143B708b00739c065F4E40d2'
);

export default instance;
