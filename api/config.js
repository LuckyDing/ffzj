let config = {}

if(process.env.NODE_ENV === 'development'){
    // 开发环境
	config.baseUrl = 'https://action.coopez.cn'
}else{
    // 生产环境
    config.baseUrl = 'https://action.coopez.cn'
}

export default config