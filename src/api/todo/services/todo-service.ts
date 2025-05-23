import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto, UpdateTodoDto } from 'src/dto/todo-dto/todo-dto';
import { Todo, TodoDocument } from 'src/schemas/todo-schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
    const newTodo = new this.todoModel({ ...createTodoDto, userId });
    return newTodo.save();
  }

  async findAll(userId: string): Promise<Todo[]> {
    return this.todoModel.find({ userId }).exec();
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
    userId: string,
  ): Promise<Todo | null> {
    return this.todoModel.findOneAndUpdate({ _id: id, userId }, updateTodoDto, {
      new: true,
    });
  }

  async delete(id: string, userId: string): Promise<Todo | null> {
    return this.todoModel.findOneAndDelete({ _id: id, userId });
  }
}
