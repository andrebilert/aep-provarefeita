import { Schema, model } from 'mongoose';

const PokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  types: {
    type: [String],
    required: true,
  },
  stats: [
    {
      name: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
  id: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  moves: {
    type: [String],
    required: true,
  },
});

export default model('Pokemon', PokemonSchema);