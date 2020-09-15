#!/bin/bash
# 自动拉取仓库
BLOG_DIR=/www/blog/
BLOG_NAME=/www/blog/blog.xuqilong.top
GIT_BACK=/www/blog/gitclone.xuqilong.top
DATE=`date "+%Y-%m-%d %H:%M:%S"`

cd ${BLOG_DIR}
if [ ! -d ${BLOG_NAME} ]; then
  git clone https://github.com/xuqil/blog.xuqilong.top.git ${BLOG_NAME}
else
  cd ${BLOG_NAME} && git pull
  if [ $? != 0 ];then
    cd ${BLOG_DIR}
    if [ -d ${GIT_BACK} ];then
      rm -rf ${GIT_BACK}
    fi
    git clone https://github.com/xuqil/blog.xuqilong.top.git ${GIT_BACK}
    if [ $? = 0 ]; then
      /bin/cp -r ${GIT_BACK}   ${BLOG_NAME}
    fi
  fi
fi

if [ $? = 0 ];then
 echo "${DATE} 部署成功!" >>  /var/log/deploy.log
else
 echo "${DATE} 部署失败" >> /var/log/deploy.log
fi
