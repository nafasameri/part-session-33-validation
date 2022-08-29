const Route = require("./Route");
const METHODS = require("http").METHODS;

class Router {
  _routePool;
  _eventEmitter;
  constructor(eventEmitter, requestEventName) {
    this._routePool = new Map();
    this._eventEmitter = eventEmitter;
    this._eventEmitter.on(requestEventName, this.route.bind(this));
  }

  addRoute(route, handler, method,middlewares) {
    let routeObject;
    const routeMethod = method.toUpperCase();
    if (!method || !METHODS.includes(routeMethod))
      throw new Error("must define HTTP method for route!");
    if (!(typeof route === "string"))
      throw new Error("Route must be type of string");

    routeObject = new Route(route, handler, routeMethod,middlewares);
    this._routePool.set(
      `${routeObject.url}_${routeObject.method}`,
      routeObject
    );
    this._addListeners(`${routeObject.url}_${routeObject.method}`);
    return routeObject;
  }

  async _execute(req, res) {
    try {
      let route = req.url.split("?")[0];
      let middlewares = this._routePool.get(
        `${route}_${req.method}`
      ).middlewares;
      let handler = this._routePool.get(`${route}_${req.method}`).handler;

      let runMiddlewareForRoute = await this._runMiddlewares(
        middlewares,
        req,
        res
      );
      if (runMiddlewareForRoute) await handler(req, res);
    } catch (e) {
      res.writeHead(res.statusCode || 500);
      res.end(
        JSON.stringify({
          message: "Something Went Wrong!",
          additionalInfo: e.message,
        })
      );
    }
  }

  async _runMiddlewares(middlewares, req, res) {
    return new Promise(async (resolve, reject) => {
      async function next(index) {
        if (middlewares.length === index) {
          return resolve(true);
        }
        const middleware = middlewares[index];
        try {
          const result = await middleware(req, res, (err) => {
            if (err) {
              return reject(err);
            }
            return next(++index);
          });

          if (result) return await next(++index);
        } catch (error) {
          reject(error);
        }
      }
      await next(0);
    });
  }

  _addListeners(key) {
    this._eventEmitter.on(key, async (req, res) => {
      await this._execute(req, res);
    });
  }

  route(req, res) {
    let route = req.url.split("?")[0];
    if (!this._routePool.has(`${route}_${req.method}`)) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "URL NOT FOUND!" }));
      return;
    }
    this._eventEmitter.emit(`${route}_${req.method}`, req, res);
  }
}

module.exports = Router;
