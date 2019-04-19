module.exports = async (ctx, next) => {
    console.log(this.session)

    if(!ctx.session.isLogin) {
        ctx.body = {
            data: {
                message: '亲，请先登陆系统噢～'
            },
            success: false,
            message: '请先登陆',
            code: -1
        }
    }

    await next()
}