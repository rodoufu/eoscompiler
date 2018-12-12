#!/usr/bin/env bash

eoscompiler_version='0.0.1'

docker build -t eoscompiler:${eoscompiler_version} eosmachine
docker build -t eosnode:${eoscompiler_version} eosnode
