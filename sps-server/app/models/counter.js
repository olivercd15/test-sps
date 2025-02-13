const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: String,  
  seq: { type: Number, default: 0 } 
});

const Counter = mongoose.model('Counter', counterSchema);

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { _id: sequenceName },  
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return sequenceDocument.seq;
}

module.exports = getNextSequenceValue;
