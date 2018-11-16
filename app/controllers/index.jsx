import D from '../../react-inject/decorators';

import Demo from '../view/demo';
import Index from '../view/index';

@D.namespace('/order')
export default class {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @D.Get('/')
  index() {
    console.log('@@@')
    this.ctx.render(Demo)
  }

  @D.Get('*')
  defaul() {
    this.ctx.render(Index)
  }
}