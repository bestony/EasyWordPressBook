FROM nginx:alpine
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY book/ /usr/share/nginx/html/