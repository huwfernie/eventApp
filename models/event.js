const mongoose = require('mongoose');
const s3 = require('../lib/s3');


const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  location: {
    name: { type: String, required: true },
    lat: { type: String, required: true },
    lon: { type: String, required: true }
  },
  website: { type: String, required: false },
  details: { type: String, required: false },
  image: { type: String, required: true }
});

eventSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

eventSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/wdi-25-london-project2/${this.image}`;
  });


eventSchema.pre('remove', function removeImage(next) {
  if(this.image) return s3.deleteObject({ Key: this.image }, next);
  next();
});

eventSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);
