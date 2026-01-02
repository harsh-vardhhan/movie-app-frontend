# Use official Node.js image (using Bun would be ideal but Node is standard for Vite dev in Docker)
FROM imbios/bun-node:latest

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Expose Vite port
EXPOSE 5173

# Run dev server with host exposure
CMD ["bun", "run", "dev", "--host"]
