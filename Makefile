help:
	@echo "Available commands:"
	@echo "  make build          - Build Docker images"
	@echo "  make up             - Start all containers"
	@echo "  make down           - Stop all containers"
	@echo "  make logs           - View logs"
	@echo "  make ps             - List running containers"
	@echo "  make shell          - Open shell in web container"
	@echo "  make restart        - Restarts the container"

# Check if .env file exists, create from example if not
.env:
	@if [ ! -f .env ]; then \
		echo "Creating .env file from .env.example..."; \
		cp .env.example .env; \
		echo "Please edit .env file with your settings"; \
	fi

# Build Docker images
build: .env
	docker-compose build

# Start all containers
up: .env build
	docker-compose up -d
	@echo "Server started at http://localhost:8000"

# Stop all containers
down:
	docker-compose down -v

# View logs
logs:
	docker-compose logs nodejs -f

# List running containers
ps:
	docker-compose ps

# Open shell in web container
shell:
	docker-compose exec nodejs /bin/bash

restart: .env build
	docker-compose down -v && \
	docker-compose up -d && \
	docker-compose logs nodejs -f

