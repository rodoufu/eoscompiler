all: test

run: startContainers
	node app.js

test:
	node ./test/index.test | tap-spec

stop: stopContainers
	pkill node

startContainers:
	docker-compose up -d

stopContainers:
	docker-compose stop
