all:

run:
	docker-compose up -d
	node app.js

startCompiler:
	docker run

removeDocker:
	docker rm eosCompiler
	docker rm eosNode

stop:
	pkill node
