# Stage 1: Build the Angular app
FROM node:18 as build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build

# Stage 2: Serve the Angular app using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/fin-stream-frontend-new /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
