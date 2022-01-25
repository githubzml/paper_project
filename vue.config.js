module.exports = {
    // 前端服务启动是否自动打开浏览器
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: "http://localhost:3000", //这里是目标服务器地址
                pathRewrite: {                   //路径重写
                    '^/api': ''                  //这里一定要为空
                },
                ws: true,                        // 是否支持websocket协议
                changeOrigin: true,              //是否改变源地址
            }
        },
    },
    // 是否开启lint语法检测
    lintOnSave: false
}