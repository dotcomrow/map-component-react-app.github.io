FROM node:16.15.1 as build
WORKDIR /<REPOSITORY_NAME>

COPY package*.json .
RUN npm install
COPY . .

RUN npm run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build ./<REPOSITORY_NAME>/build /usr/share/nginx/html

EXPOSE 80

CMD nginx -g 'daemon off;'