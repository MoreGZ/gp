const CoreRouter = require('koa-router')
const path = require('path')

class Router {
    constructor() {
        this.coreRouter = new CoreRouter()
    }

    get(routePath, middlewareStr) {
        return this.handle('get', routePath, middlewareStr)
    }

    post(routePath, middlewareStr) {
        return this.handle('post', routePath, middlewareStr)
    }

    delete(routePath, middlewareStr) {
        return this.handle('delete', routePath, middlewareStr)
    }

    put(routePath, middlewareStr) {
        return this.handle('put', routePath, middlewareStr)
    }

    patch(routePath, middlewareStr) {
        return this.handle('patch', routePath, middlewareStr)
    }

    del(routePath, middlewareStr) {
        return this.handle('del', routePath, middlewareStr)
    }

    handle(method, routePath, middlewareStr) {
        if(typeof middlewareStr !== 'string') {
            console.warn('请输入正确的 middlewareStr')
            return false
        }
        
        const handlerName = middlewareStr.split('@')[1]
        const controllerPath = path.resolve(__dirname, `../controllers/${middlewareStr.split('@')[0]}`,)
        console.log(controllerPath)
        const controller = require(controllerPath)
        this.coreRouter[method](routePath, controller.creator(handlerName))
        return this
    }

    group(routePath, router) {
        if(!!router) {
            this.coreRouter.use(routePath, router.routes())
        }else {
            router = routePath
            this.coreRouter.use(router.routes())
        }

        return this
    }

    routes() {
        return this.coreRouter.routes()
    }

    allowedMethods(options) {
        return this.coreRouter.allowedMethods(options)
    }

    getCoreRouter() {
        return this.coreRouter
    }
}

module.exports = Router