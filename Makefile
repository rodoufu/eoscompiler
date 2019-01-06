all:

run:
	docker-compose up -d
	node app.js

stop:
	docker-compose stop
	pkill node
