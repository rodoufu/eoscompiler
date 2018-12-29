#!/usr/bin/env bash

#sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
#sudo chmod +x /usr/local/bin/docker-compose
npm install

eoscompiler_version='0.0.1'

docker build -t eoscompiler:${eoscompiler_version} eoscompiler
docker build -t eosnode:${eoscompiler_version} eosnode

docker-compose up -d
