import D, { Get } from '../../react-inject/decorators';

import Index from '../view/index';
import Person from '../view/person';
import notFount from '../view/404';

console.log(D, Get)

@D.namespace('/')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @D.Get('/')
  index() {
    this.ctx.render(Index)
  }

  @D.Get('/person/:userid')
  person() {
    this.ctx.render(Person)
  }

  @D.Get('*')
  notFount() {
    this.ctx.render(notFount)
  }
}

export default IndexController;