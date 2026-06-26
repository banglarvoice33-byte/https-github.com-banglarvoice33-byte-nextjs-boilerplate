#!/bin/bash

# Banglar Voice - Autonomous Deployment Script
echo "🚀 Starting Banglar Voice Deployment..."

# 1. Update system
sudo apt-get update && sudo apt-get upgrade -y

# 2. Install Docker & Nginx if missing
if ! command -v docker &> /dev/null
then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
fi

if ! command -v nginx &> /dev/null
then
    echo "Installing Nginx..."
    sudo apt-get install -y nginx
fi

# 3. Setup Nginx Config
echo "Configuring Nginx..."
sudo cp nginx.conf /etc/nginx/sites-available/banglarvoice
sudo ln -s /etc/nginx/sites-available/banglarvoice /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

# 4. Build and Run Containers
echo "Building Docker Containers..."
docker-compose up -d --build

# 5. Database Setup
echo "Running Prisma Migrations..."
docker exec banglar-voice-app npx prisma migrate deploy

echo "✅ Deployment Successful! Platform is live at https://banglarvoice24news.com"
echo "🤖 Telegram Webhook is listening at /api/telegram-webhook"