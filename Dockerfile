FROM nginx:1.27.0-alpine
COPY _book/* /usr/share/nginx/html
