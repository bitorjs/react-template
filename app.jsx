import ReactApplication from './react-inject';
import classloader from './.classloader'
import App from './app/view/App'

let client = app => {
  app.on('ready', () => {
    const ctrls = classloader['controllers'];
    for (const key in ctrls) {
      if (ctrls.hasOwnProperty(key)) {
        const c = ctrls[key];
        app.registerController(c);
      }
    }
  })
}

new ReactApplication().start(client, null, App);
