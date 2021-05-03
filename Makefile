IMAGE_NAME = vtex/search-healthcheck-stable

run: build
	docker run --ipc=host --shm-size 1024M $(IMAGE_NAME) yarn test:monitoring

build: .
	docker build -t $(IMAGE_NAME) --build-arg HORUS_PROXY_KEY --build-arg HORUS_COGNITO_CREDENTIALS .
