const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Event = require('../models/event');

mongoose.connect(dbURI);

Event.collection.drop();

const eventData = [{
  name: 'Baseball for beginers',
  category: 'sport',
  location: {name: 'Finsbury Park', lat: 50, lon: -1},
  website: 'http://www.londonmets.org/page/show/1229784-baseball-for-beginners',
  image: 'http://cdn4.sportngin.com/attachments/text_block/3526/0385/B4B_Regulars_1__medium.jpg'
},{
  name: 'Baseball for beginers 2',
  category: 'sport',
  location: {name: 'Finsbury Park', lat: 50, lon: -1},
  website: 'http://www.londonmets.org/page/show/1229784-baseball-for-beginners',
  image: 'http://cdn4.sportngin.com/attachments/text_block/3526/0385/B4B_Regulars_1__medium.jpg'
}];

Event
  .create(eventData)
  .then(events => console.log(`${events.length} events created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
