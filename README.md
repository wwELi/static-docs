## build
docker build -t static-html .

## run 
docker run -d -p 5000:80 static-html

## exec 
docker exec -it static-html bash

## 执行脚本
chmod 755 ./exec.sh