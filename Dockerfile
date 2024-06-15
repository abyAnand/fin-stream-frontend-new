# Stage 1: Build the Angular app
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Stage 2: Serve the Angular app using Nginx
FROM nginx:alpine
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/fin-stream-frontend-new /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
