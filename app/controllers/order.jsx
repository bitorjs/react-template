import D from '../../react-inject/decorators';

import Order from '../view/order';
import Detail from '../view/detail';
import notFount from '../view/404';

@D.namespace('/order')
class Controller {
  constructor(ctx) {
    this.ctx = ctx;
    this.bug = false;
  }

  @D.Get('/')
  index() {
    this.ctx.render(Order)
  }

  @D.Get('/detail/:id')
  renderApp() {
    let params = this.ctx.params;
    console.log('detail...', params)
    this.ctx.render(Detail, params);
  }

  //get *
  @D.Get('*')
  notFount() {
    this.ctx.render(notFount)
  }

  debug() {
    return this.bug;
  }

}

export default Controller;