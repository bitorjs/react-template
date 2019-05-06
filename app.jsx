import 'normalize.css';
import ReactApplication from 'bitorjs/react';
import start from './app/view/start'

let client = app => {
  app.watch(require.context('./app', true, /^((?!\/(view|components)\/).)+\.(jsx|js)$/));
  app.on('ready', () => {

  })
}

new ReactApplication({}, start).start(client, null, start);
