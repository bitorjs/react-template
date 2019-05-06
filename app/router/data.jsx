import {
  Controller,
  Get,
  Post,
  Delete
} from 'bitorjs';

@Controller('/api')
export default class {
  constructor(ctx) {
    this.ctx = ctx;
  }


  @Get('/default')
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

  @Post('/person/:userid')
  async person(params) {
    let userid = params.userid;
    return await userid;
  }

  @Delete('/detail')
  notFount() {
    return [
      1, 2, 3
    ]
  }
}
