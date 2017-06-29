const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Event = require('../models/event');

Event.collection.drop();

const eventData = [{
  name: 'Baseball for beginers',
  category: 'sport',
  location: {name: 'Finsbury Park', lat: 51.574608, lon: -0.099564},
  website: 'http://www.londonmets.org/page/show/1229784-baseball-for-beginners',
  image: 'http://cdn4.sportngin.com/attachments/text_block/3526/0385/B4B_Regulars_1__medium.jpg'
},{
  name: 'Sailing on the pond',
  category: 'sport',
  location: {name: 'Stoke Newington West Reservoir', lat: 51.566686, lon: -0.091324},
  website: 'http://www.northlondonsailing.org/',
  image: './src/images/seeds/nlsa.jpg'
},{
  name: 'Climbing at the Castle',
  category: 'sport',
  location: {name: 'The Castle climbing center', lat: 51.565245, lon: -0.092536},
  website: 'https://www.castle-climbing.co.uk/',
  image: 'https://www.google.co.uk/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwiHg_KD8eLUAhWOYVAKHZlbDXsQjRwIBw&url=https%3A%2F%2Fwww.castle-climbing.co.uk%2FEvents&psig=AFQjCNGRSlPxXYcvH_7xqACnJbqvMn-qYQ&ust=1498819803403032'
}];

Event
  .create(eventData)
  .then(events => console.log(`${events.length} events created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
