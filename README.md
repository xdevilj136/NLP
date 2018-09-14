
## 项目运行（nodejs 6.0+）

# 进入文件夹
cd NLP_front

# 安装依赖
npm install

#启动服务
# 开启本地开发环境服务器localhost:8088
npm run dev
# 服务器启动后台服务
1. 下载pm2, pm2为启动后台服务的工具
2. 在NLP_font根目录下, 运行 pm2 start node build/dev-server.js --name "NLP"     (NLP为定义的服务名)
3. 查看运行情况 pm2 list
4. 重启服务  pm2 restart NLP       (NLP为定义的服务名)

# 发布环境
npm run build
