import D from '../../react-inject/decorators';

@D.namespace('/api')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @D.Get('/default')
  index() {
    return [{
      id: 1,
      name: 'huang'
    },
    {
      id: 2,
      name: 'zheng'
    },
    {
      id: 3,
      name: 'jie'
    },
    ]
  }

  @D.Post('/person/:userid')
  async person(params) {
    let userid = params.userid;
    return await userid;
  }

  @D.Delete('/detail')
  notFount() {
    return [
      1, 2, 3
    ]
  }
}

export default IndexController;