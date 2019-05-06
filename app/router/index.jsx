import {
  Controller,
  Get,
  Post,
} from 'bitorjs';
import Index from '../view/index';
import Person from '../view/person';
import notFount from '../view/404';

@Controller('/')
export default class {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @Get('/')
  index() {
    this.ctx.render(Index)
  }

  @Get('/person/:userid')
  person() {
    this.ctx.render(Person)
  }

  @Get('*')
  notFount() {
    this.ctx.render(notFount)
  }
}