FROM ubuntu
MAINTAINER rodoufu@gmail.com

RUN apt-get update
RUN apt-get --yes --force-yes install wget

RUN wget https://github.com/eosio/eos/releases/download/v1.5.0/eosio_1.5.0-1-ubuntu-18.04_amd64.deb
RUN apt-get --yes --force-yes install ./eosio_1.5.0-1-ubuntu-18.04_amd64.deb
RUN rm eosio_1.5.0-1-ubuntu-18.04_amd64.deb

RUN mkdir /home/eosnode
WORKDIR /home/eosnode

#CMD nodeos -e -p eosio --plugin eosio::producer_plugin --plugin eosio::chain_api_plugin --plugin eosio::http_plugin --plugin eosio::history_plugin --plugin eosio::history_api_plugin --data-dir CONTRACTS_DIR/eosio/data --config-dir CONTRACTS_DIR/eosio/config --access-control-allow-origin='*' --contracts-console --http-validate-host=false --verbose-http-errors --filter-on='*' >> nodeos.log 2>&1 &
CMD ["echo", "EOS image created"]
#CMD ["/bin/bash", ""]
