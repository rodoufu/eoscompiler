FROM ubuntu
MAINTAINER rodoufu@gmail.com

RUN apt-get update
RUN apt-get --yes --force-yes install wget

RUN wget https://github.com/eosio/eos/releases/download/v1.5.0/eosio_1.5.0-1-ubuntu-18.04_amd64.deb
RUN apt-get --yes --force-yes install ./eosio_1.5.0-1-ubuntu-18.04_amd64.deb
RUN rm eosio_1.5.0-1-ubuntu-18.04_amd64.deb

RUN mkdir /home/eosnode
COPY startnode.sh /home/eosnode
WORKDIR /home/eosnode

CMD ["echo", "EOS image created"]
CMD ./startnode.sh
