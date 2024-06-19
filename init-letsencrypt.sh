#!/bin/sh

# Define the domain and email
DOMAIN="fin-stream.online"
EMAIL="abianandpc2020@gmail.com"

# Define paths for SSL certificates
CERT_PATH="/etc/letsencrypt/live/$DOMAIN"
CERT_KEY="/etc/ssl/private/privkey.pem"
CERT_FULLCHAIN="/etc/ssl/certs/fullchain.pem"

# Check if certificates already exist
if [ ! -f "$CERT_KEY" ] || [ ! -f "$CERT_FULLCHAIN" ]; then
  echo "Obtaining SSL certificates..."
  certbot certonly --webroot -w /usr/share/nginx/html -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --non-interactive

  # Copy the obtained certificates to the correct locations
  cp "$CERT_PATH/privkey.pem" "$CERT_KEY"
  cp "$CERT_PATH/fullchain.pem" "$CERT_FULLCHAIN"
else
  echo "SSL certificates already exist, skipping generation."
fi

# Start NGINX
echo "Starting NGINX..."
nginx -g "daemon off;"
