import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    } else {
      return task;
    }
  }

  deleteTask(id: string): void {
    // const returnedTask: Task = this.getTaskById(id);
    const found = this.getTaskById(id);
    if (found) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    }
    // return returnedTask;
  }
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
  getTasksWithFilters(filterDto: FilterTaskDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }
}
