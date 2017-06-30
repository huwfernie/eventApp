const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Event = require('../models/event');
const Location = require('../models/location');



Event.collection.drop();
Location.collection.drop();

const places = [
  {
    'name': 'Piaţa Cipariu',
    // get coordinates [ <longitude> , <latitude> ]
    'loc': [
      23.600800037384033,
      46.76758746952729
    ],
    '_id': '5335e5a7c39d60402849e38f',
    '__v': 0
  },
  {
    'name': 'Stația Piața Cipariu',
    'loc': [
      23.601171912820668,
      46.76771454984428
    ],
    '_id': '5335e5a7c39d60402849e3a5',
    '__v': 0
  }
];

const eventData = [{
  name: 'Baseball for beginers',
  category: 'sport - field sports - baseball',
  location: {name: 'Finsbury Park', lat: 51.574608, lon: -0.099564},
  loc: { type: 'Point', coordinates: [-0.099564,51.574608] },
  //loc: ,//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  website: 'http://www.londonmets.org/page/show/1229784-baseball-for-beginners',
  details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  image: 'http://cdn4.sportngin.com/attachments/text_block/3526/0385/B4B_Regulars_1__medium.jpg'
},{
  name: 'Sailing on the pond',
  category: 'sports - watersports - sailing',
  location: {name: 'Stoke Newington West Reservoir', lat: 51.566686, lon: -0.091324},
  // loc: [-0.091324,51.566686],
  loc: { type: 'Point', coordinates: [-0.099564,51.574608] },
  website: 'http://www.northlondonsailing.org/',
  details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  image: 'http://www.northlondonsailing.org/_/rsrc/1484999025446/home/frontmain.jpg?height=300&width=400'
},{
  name: 'Climbing at the Castle',
  category: 'sports - climbing',
  location: {name: 'The Castle climbing center', lat: 51.565245, lon: -0.092536},
  // loc: [-0.092536,51.565245],
  loc: { type: 'Point', coordinates: [-0.099564,51.574608] },
  website: 'https://www.castle-climbing.co.uk/',
  details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  image: 'https://www.castle-climbing.co.uk/sites/default/files/Castle%20Outside.jpg'
},{
  name: 'One in Falmouth',
  category: 'sports - watersports - sailing',
  location: {name: 'Falmouth', lat: 50.1526, lon: -5.0663},
  // loc: [-5.0663,50.1526],
  loc: { type: 'Point', coordinates: [0,0] },
  website: 'http://www.northlondonsailing.org/',
  details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Falmouth_Cornwall.jpg/1200px-Falmouth_Cornwall.jpg'
}];

Event
  .create(eventData)
  .then(events => console.log(`${events.length} events created!`))
  .catch(err => console.log(err))
  .then(()=> {
    Location
      .create(places)
      .then(places => console.log(`${places.length} places created!`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close());
  });
