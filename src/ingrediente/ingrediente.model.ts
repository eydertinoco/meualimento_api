import * as mongoose from 'mongoose';

export const IngredienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
});

export interface Ingrediente extends mongoose.Document {
  id: string;
  nome: string;
  descricao: string;
}
