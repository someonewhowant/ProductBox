# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Use npm ci for faster, more reliable builds based on package-lock.json
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve
FROM nginx:alpine
# Ensure we copy from the correct output path defined in angular.json
COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
