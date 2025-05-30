import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
