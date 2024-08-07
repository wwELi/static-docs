FROM node:latest as node-01
COPY ./html /html/
COPY ./app /app/

WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx
COPY --from=node-01 /dist /usr/share/nginx/html
COPY ./html/assets /usr/share/nginx/html/assets
COPY default.conf /etc/nginx/conf.d/default.conf
