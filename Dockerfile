FROM nginx:alpine
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY book/html/ /usr/share/nginx/html/