# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port
EXPOSE 3004

# Command to run the app
CMD ["npm", "start"]
