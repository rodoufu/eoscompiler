#!/usr/bin/env bash
file_name=$1
echo $2 | base64 -d >> "$file_name".cpp
eosio-cpp -o "$file_name".wasm  "$file_name".cpp --abigen

if [[ -f "$file_name".abi ]]; then
    if [[ -f "$file_name".wasm ]]; then
        abi_content=`cat $file_name.abi | base64 -w 0`
        wasm_content=`cat $file_name.wasm | base64 -w 0`
        echo "{\"abi\":\"$abi_content\",\"wasm\":\"$wasm_content\",\"error\":\"\"}" | base64 -w 0
    fi
else
    echo "{\"abi\":\"\",\"wasm\":\"\"}"
fi