import 'reflect-metadata';
import React from 'react'
import ReactDOM from 'react-dom'
import metakeys from './metakeys';
import Application from 'bitorjs-application';
import Store from '../../store';



class ReactApplication extends Application {
  constructor() {
    super()

    this.ctx.render = (webview, props) => {
      // if (this.$react) {
      this.$react.webview = webview;
      this.$react.webviewprops = props;
      this.$react.setState({
        update: true
      })
      // } else {
      //   setTimeout(() => {
      //     this.ctx.render(webview, props)
      //   }, 100)
      // }

    }

    this.use((ctx, next) => {
      let routes = this.$route.match(ctx.url);
      console.log(routes)
      if (routes[0]) {
        ctx.params = routes[0].params;
        routes[0].handle(routes[0].params)
      }
      next()
    }).use(function (ctx, dispatch) {
      console.log('middleware end')
    })
  }

  mountReact() {
    // React.Component.prototype = this;
    this.store = new Store('app', '$');
    React.Component.prototype.store = this.store;
    React.Component.prototype.$store = this.store;
    React.Component.prototype.$bitor = this;
    React.Component.prototype.reload = this.reload;
    React.Component.prototype.replace = this.replace;
    React.Component.prototype.redirect = this.redirect.bind(this);
    this.requestMethod();
  }

  requestMethod() {
    ['get', 'post', 'delete', 'put'].forEach((method) => {
      this.ctx[method] = React.Component.prototype[method] = (url) => {
        let routes = this.$route.match(url, method);
        console.log(routes)
        if (routes[0]) {
          return routes[0].handle(routes[0].params)
        }
      }
    })
  }

  createReactRoot(rootElementId, rootComponent) {
    const that = this;
    class RootElement extends React.Component {
      constructor(props) {
        super(props);
        this.webview = null;
        this.webviewprops = {}
        that.$react = this;
        this.count = 0;
      }
      render() {
        console.log(this.count++)
        return this.webview ? React.Children.only(React.createElement(this.webview, this.webviewprops)) : ''
      }
    }

    const Root = rootComponent ? rootComponent : RootElement;

    ReactDOM.render(<Root>{rootComponent ? (<RootElement></RootElement>) : null}</Root>, document.querySelector(rootElementId));
  }

  start(client, rootElementId, rootComponent) {
    this.mountReact();
    rootElementId = rootElementId || "#root"
    this.createReactRoot(rootElementId, rootComponent)
    this.registerPlugin(client)
    this.emit('ready');
    this.startServer()
    this.emit('after-server');
  }


  registerRoutes(classname) {
    const c = new classname(this.ctx)
    let routes = {};
    const prefix = Reflect.getMetadata('namespace', classname) || '';

    const ownPropertyNames = Object.getOwnPropertyNames(classname['prototype']);
    ownPropertyNames.forEach(propertyName => {
      metakeys.reduce((ret, cur) => {
        let subroute = Reflect.getMetadata(cur, classname['prototype'], propertyName);
        if (subroute) {
          let path;

          if (prefix.path && prefix.path.length > 1) { //:   prefix='/'
            subroute.path = subroute.path === '/' ? '(/)?' : subroute.path;
            subroute.path = subroute.path === '*' ? '(.*)' : subroute.path;
            path = `${prefix.path}${subroute.path}`
          } else {
            path = `${subroute.path}`
          }

          this.$route.register(path, {
            method: subroute.method.toLowerCase(),
            // end: subroute.path !== '/'
          }, c[subroute.prototype].bind(c))
        }
      }, '')
    })
  }

  registerController(controller) {
    this.registerRoutes(controller)
  }

  registerComponent(component) {
    if (!(component instanceof Object)) {
      throw new TypeError('component must be Vue instance')
    }

    Vue.component(component.name, component);
  }

  registerDirective(name, option) {
    Vue.directive(name, option)
  }

  registerPlugin(plugin) {
    plugin(this);
  }
}

export default ReactApplication;