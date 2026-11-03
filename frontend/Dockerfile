
# Stage 1: Build the React application
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the frontend source code
COPY . .

# Build the production application
RUN npm run build


# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the production build from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Document the Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
