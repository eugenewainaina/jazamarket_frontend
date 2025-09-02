# Stage 1: Build the React application
FROM node:22-alpine as build

# Set working directory
WORKDIR /app

# Add build arguments for optimization
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false

# Copy package files for dependency caching
COPY package*.json ./

# Install dependencies (this layer will be cached if package.json doesn't change)
RUN npm ci --silent && npm cache clean --force

# Copy source code (done after npm install for better caching)
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
