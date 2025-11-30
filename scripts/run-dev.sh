#!/bin/bash

# Exit on error
set -e

# Configuration
IMAGE_NAME="one-step-frontend"
CONTAINER_NAME="one-step-frontend-container"
PORT=3000

echo "🚀 Starting production build and deployment..."

# Check if container is already running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "🛑 Stopping existing container..."
    docker stop $CONTAINER_NAME
fi

# Remove old container if exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "🗑️  Removing old container..."
    docker rm $CONTAINER_NAME
fi

# Build Docker image
echo "🔨 Building Docker image..."
docker build -t $IMAGE_NAME .

# Run container
echo "🎯 Starting container..."
docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:80 \
    --restart unless-stopped \
    $IMAGE_NAME

echo "✅ Deployment complete!"
echo "🌐 Application is running at http://localhost:$PORT"
echo ""
echo "Useful commands:"
echo "  View logs:    docker logs -f $CONTAINER_NAME"
echo "  Stop app:     docker stop $CONTAINER_NAME"
echo "  Remove app:   docker rm $CONTAINER_NAME"