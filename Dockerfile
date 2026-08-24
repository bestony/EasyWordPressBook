FROM nginx:alpine
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY doc_build/ /usr/share/nginx/html/
