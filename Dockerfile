# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock file to the working directory
COPY package.json yarn.lock /app/

# Install dependencies
RUN yarn install --frozen-lockfile

# Expose port 5005 for the application
EXPOSE 5005

# Start the application in watch mode
CMD ["yarn", "dev"]

# Mount local source code directory into the container for live reload
VOLUME ["/app"]
