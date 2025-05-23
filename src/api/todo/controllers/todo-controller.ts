import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from 'src/dto/todo-dto/todo-dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { TodoService } from '../services/todo-service';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(@Request() req) {
    return this.todoService.findAll(req.user.userId);
  }

  @Post('add')
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todoService.create(createTodoDto, req.user.userId);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req,
  ) {
    return this.todoService.update(id, updateTodoDto, req.user.userId);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string, @Request() req) {
    return this.todoService.delete(id, req.user.userId);
  }
}
