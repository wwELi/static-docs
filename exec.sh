#!/bin/bash
docker ps -a | grep "static-container" | awk '{print $1}' | xargs docker rm -f; 
docker image rm -f static-html;
docker build -t static-html .;
docker run --name static-container -d -p 4000:80 static-html;