import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  quantity: number;
  bought: boolean;
  userId: string;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    bought: { type: Boolean, default: false },
    userId: { type: String, required: true }
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;
