const generator = require('./generator');

generator('filter', { appendType: false });
generator('component', { appendType: false });

//Generate a common service module, calling each service its name + service, ie. dataservice
generator('service', { appendType: true });
