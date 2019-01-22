import 'normalize.css';
import ReactApplication from './inject';
import start from './app/view/start'

let client = app => {
  app.watch(require.context('./app', true, /^((?!\/(view|components)\/).)+\.(jsx|js)$/));
  app.on('ready', () => {

  })
}

new ReactApplication().start(client, null, start);
