#!/bin/bash
# 自动拉取仓库
cd /www/blog

if [ ! -d "blog.xuqilong.top" ]; then
  git clone https://github.com/xuqil/blog.xuqilong.top.git
fi
DATE=`date "+%Y-%m-%d %H:%M:%S"`
cd blog.xuqilong.top
git pull

if [ $? = 0 ];then
 echo "${DATE} 部署成功!" >>  /var/log/deploy.log
else
 echo "${DATE} 部署失败" >> /var/log/deploy-err.log
fi
