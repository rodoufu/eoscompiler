#!/usr/bin/env bash
echo $1 | base64 -d >> file.cpp
eosio-cpp -o file.wasm  file.cpp --abigen

if [[ -f file.abi ]]; then
    if [[ -f file.wasm ]]; then
        abi_content=`cat file.abi | base64 -w 0`
#        wasm_content=`cat file.wasm`
        wasm_content=""
        echo "{\"abi\":\"$abi_content\",\"wasm\":\"$wasm_content\",\"error\":\"\"}" | base64 -w 0
    fi
else
    echo "{\"abi\":\"\",\"wasm\":\"\"}"
fi