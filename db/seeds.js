const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Event = require('../models/event');

Event.collection.drop();

const eventData = [{
  name: 'Baseball for beginers',
  category: 'sport - field sports - baseball',
  location: {name: 'Finsbury Park', lat: 51.574608, lon: -0.099564},
  loc: [-0.099564,51.574608],  // get coordinates [ <longitude> , <latitude> ]
  website: 'http://www.londonmets.org/page/show/1229784-baseball-for-beginners',
  details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  image: 'http://cdn1.sportngin.com/attachments/photo/8581/0930/B4B8_large.jpg',
  startTime: new Date(2003, 2, 1, 18, 0, 0, 0),
  finishTime: new Date(2003, 2, 1, 21, 0, 0, 0),
  date: new Date(2017, 7, 1, 1, 1, 1, 1)
  //new Date(year, month, day, hours, minutes, seconds, milliseconds)
},{
  name: 'Sailing on the pond',
  category: 'sports - watersports - sailing',
  location: {name: 'Stoke Newington West Reservoir', lat: 51.566686, lon: -0.091324},
  loc: [-0.091324,51.566686],
  website: 'http://www.northlondonsailing.org/',
  details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  image: 'http://www.northlondonsailing.org/_/rsrc/1484999025446/home/frontmain.jpg?height=300&width=400',
  startTime: new Date(2003, 2, 1, 10, 0, 0, 0),
  finishTime: new Date(2003, 2, 1, 13, 0, 0, 0),
  date: new Date(2017, 7, 1, 1, 1, 1, 1)
},{
  name: 'Climbing at the Castle',
  category: 'sports - climbing',
  location: {name: 'The Castle climbing center', lat: 51.565245, lon: -0.092536},
  loc: [-0.092536,51.565245],
  website: 'https://www.castle-climbing.co.uk/',
  details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  image: 'https://www.castle-climbing.co.uk/sites/default/files/Castle%20Outside.jpg',
  startTime: new Date(2003, 2, 1, 8, 0, 0, 0),
  finishTime: new Date(2003, 2, 1, 17, 0, 0, 0),
  date: new Date(2017, 7, 1, 1, 1, 1, 1)
},{
  name: 'One in Falmouth',
  category: 'sports - watersports - sailing',
  location: {name: 'Falmouth', lat: 50.1526, lon: -5.0663},
  loc: [-5.0663,50.1526],
  website: 'http://www.northlondonsailing.org/',
  details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Falmouth_Cornwall.jpg/1200px-Falmouth_Cornwall.jpg',
  startTime: new Date(2003, 2, 1, 10, 0, 0, 0),
  finishTime: new Date(2003, 2, 1, 13, 0, 0, 0),
  date: new Date(2017, 7, 1, 1, 1, 1, 1)
}];

Event
  .create(eventData)
  .then(events => console.log(`${events.length} events created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
