import {
  Controller,
  Get,
  Post,
} from 'bitorjs-decorators';
import Order from '../view/order';
import Detail from '../view/detail';
import notFount from '../view/404';

@Controller('/order')
export default class {
  constructor(ctx) {
    this.ctx = ctx;
    this.bug = false;
  }

  @Get('/')
  index() {
    this.ctx.render(Order)
  }

  @Get('/detail/:id')
  renderApp() {
    let params = this.ctx.params;
    console.log('detail...', params)
    this.ctx.render(Detail, params);
  }

  //get *
  @Get('/*')
  notFount() {
    this.ctx.render(notFount)
  }

  debug() {
    return this.bug;
  }

}

