import React from 'react'
import ReactDOM from 'react-dom'
import decorators from 'bitorjs-decorators';
import Application from 'bitorjs-application';
import Store from 'bitorjs-store';


export default class extends Application {
  constructor() {
    super()

    this.useRouteMiddleware()
  }

  useRouteMiddleware() {
    this.use((ctx) => {
      let routes = this.match(ctx.url);
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
    decorators.methods.forEach((method) => {
      this.ctx[method] = React.Component.prototype[method] = (url) => {
        let routes = this.match(url, method);
        console.log(routes)
        let route = routes[0];
        if (route && !route.params['0']) {
          return route.handle(route.params)
        } else {
          return null;
        }
      }
    })
  }

  createReactRoot(rootElementId, rootComponent) {
    this.ctx.render = (webview, props) => {
      this.$react.webview = webview;
      this.$react.webviewprops = props;
      this.$react.setState({
        __update__: true
      })
    }

    const RootElement = this.createRootElement(this);
    const Root = rootComponent ? rootComponent : RootElement;
    ReactDOM.render(<Root>{rootComponent ? (<RootElement></RootElement>) : null}</Root>, document.querySelector(rootElementId));
  }

  createRootElement(app) {
    return class RootElement extends React.Component {
      constructor(props) {
        super(props);
        this.webview = null;
        this.webviewprops = {}
        this.count = 0;
        app.$react = this;
      }
      render() {
        return this.webview ? React.Children.only(React.createElement(this.webview, this.webviewprops)) : ''
      }
    }
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

  registerController(controller) {
    const instance = new controller(this.ctx)

    decorators.iterator(controller, (prefix, subroute) => {
      let path;
      if (prefix.path && prefix.path.length > 1) { //:   prefix='/'
        subroute.path = subroute.path === '/' ? '(/)?' : subroute.path;
        subroute.path = subroute.path === '*' ? '(.*)' : subroute.path;
        path = `${prefix.path}${subroute.path}`
      } else {
        path = `${subroute.path}`
      }

      this.registerRoute(path, {
        method: subroute.method.toLowerCase()
      }, instance[subroute.prototype].bind(instance))
    })
  }

  registerService(filename, service) {
    const instance = new service(this.ctx);
    let name = decorators.getServiceName(service);
    if (name) {
      if (_services.indexOf(name) === -1) {
        _services.push(name)
        this.ctx.Service = this.ctx.Service || {};
        this.ctx.Service[name] = instance;
      } else {
        throw new Error(`Service [${name}] has been declared`)
      }
    } else {
      if (_services.indexOf(filename) === -1) {
        _services.push(filename)
        this.ctx.Service = this.ctx.Service || {};
        this.ctx.Service[filename] = instance;
        console.warn('Service ', service, 'use @Service(name)')
      } else {
        throw new Error(`Service [${filename}] has been declared`)
      }
    }
  }

  watch(requireContext) {
    return requireContext.keys().map(key => {
      console.log(key)
      let m = requireContext(key);
      let c = m.default || m;
      let filename = key.replace(/(.*\/)*([^.]+).*/ig, "$2");
      if (key.match(/\/filter\/.*\.jsx$/) != null) {
        this.registerFilter(filename, c)
      } else if (key.match(/\/middleware\/.*\.jsx$/) != null) {
        this.registerMiddleware(c)
      } else if (key.match(/\/controller\/.*\.jsx$/) != null) {
        this.registerController(c);
      } else if (key.match(/\/service\/.*\.jsx$/) != null && this.config && this.config.mock !== true) {
        this.registerService(filename, c);
      } else if (key.match(/\/mock\/.*\.jsx$/) != null && this.config && this.config.mock === true) {
        this.registerService(filename, c);
      } else if (key.match(/\/store\/.*\.jsx$/) != null) {
        this.registerStore(filename, c);
      }
    })
  }

  registerPlugin(plugin) {
    const modules = [];

    this.config = this.config || {};
    const configs = require.context('../config', false, /\.js$/)
    configs.keys().map(key => {
      let m = configs(key);
      let c = m.default || m;
      if (key.match(/\/plugin\.js$/) != null) {
        c.forEach(item => {
          if (item.enable === true) modules.push(item);
        })

      } else if (key.match(/\/development\.js$/) != null) {
        if (process.env.IS_DEV === true) {
          this.config = Object.assign(this.config, c)
        }
      } else if (key.match(/\/production\.js$/) != null) {
        if (process.env.IS_DEV === false) {
          this.config = Object.assign(this.config, c)
        }
      } else {
        console.log(c)
        this.config = Object.assign(this.config, c)
      }
    })
    plugin(this);
    modules.forEach(m => {
      m.module(this, m)
    })
  }
}