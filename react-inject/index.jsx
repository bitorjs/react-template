import React from 'react'
import ReactDOM from 'react-dom'
import decorators from './decorators';
import Application from 'bitorjs-application';
import Store from 'bitorjs-store';

export default class extends Application {
  constructor() {
    super()

    this.useRouteMiddleware()
  }

  useRouteMiddleware() {
    this.use((ctx) => {
      let routes = this.$route.match(ctx.url);
      console.log(routes)
      let route = routes[0];
      if (route) {
        ctx.params = route.params;
        route.handle(route.params)
      }
    })
  }

  mountReact() {
    this.store = new Store('app', '$');
    React.Component.prototype.$store = this.store;
    React.Component.prototype.$bitor = this;
    React.Component.prototype.reload = this.reload;
    React.Component.prototype.replace = this.replace;
    React.Component.prototype.redirect = this.redirect.bind(this);
    this.mountRequest();
  }

  mountRequest() {
    ['get', 'post', 'delete', 'put'].forEach((method) => {
      this.ctx[method] = React.Component.prototype[method] = (url) => {
        let routes = this.$route.match(url, method);
        console.log(routes)
        let route = routes[0];
        if (route && !route.regexp.fast_star) {
          return route.handle(route.params)
        } else {
          return null;
        }
      }
    })
  }

  createReactRoot(rootElementId, rootComponent) {
    const that = this;
    this.ctx.render = (webview, props) => {
      this.$react.webview = webview;
      this.$react.webviewprops = props;
      this.$react.setState({
        __update__: true
      })
    }
    class RootElement extends React.Component {
      constructor(props) {
        super(props);
        this.webview = null;
        this.webviewprops = {}
        this.count = 0;
        that.$react = this;
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
    rootElementId = rootElementId || "#root"
    this.mountReact();
    this.createReactRoot(rootElementId, rootComponent)
    this.registerPlugin(client)
    this.emit('ready');
    this.startServer()
    this.emit('after-server');
  }


  registerRoutes(classname) {
    const c = new classname(this.ctx)

    decorators.iterator(classname, (prefix, subroute) => {
      let path;
      if (prefix.path && prefix.path.length > 1) { //:   prefix='/'
        subroute.path = subroute.path === '/' ? '(/)?' : subroute.path;
        subroute.path = subroute.path === '*' ? '(.*)' : subroute.path;
        path = `${prefix.path}${subroute.path}`
      } else {
        path = `${subroute.path}`
      }

      this.$route.register(path, {
        method: subroute.method.toLowerCase()
      }, c[subroute.prototype].bind(c))
    })
  }

  registerController(controller) {
    this.registerRoutes(controller)
  }

  registerPlugin(plugin) {
    plugin(this);
  }
}