const routes =  require('next-routes')();
routes
.add('/Campiagns/new','/Campiagns/new')
.add('/Campiagns/:address','/Campiagns/show')
.add('/Campiagns/:address/requests','/Campiagns/requests/index')
.add('/Campiagns/:address/requests/new','/Campiagns/requests/new')
;
module.exports =routes;
