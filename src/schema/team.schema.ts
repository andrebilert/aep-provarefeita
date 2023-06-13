import { Schema, model } from 'mongoose';

const TeamSchema = new Schema({
  trainerName: String,
  team: [{
    name: { type: String, required: true }
  }]
});

export default model('Team', TeamSchema);
