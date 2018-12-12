FROM ubuntu
MAINTAINER rodoufu@gmail.com

RUN apt-get update
RUN apt-get --yes --force-yes install wget

RUN wget https://github.com/eosio/eosio.cdt/releases/download/v1.3.2/eosio.cdt-1.3.2.x86_64.deb
RUN apt-get --yes --force-yes install ./eosio.cdt-1.3.2.x86_64.deb
RUN rm eosio.cdt-1.3.2.x86_64.deb

RUN mkdir /home/eoscompiler
COPY compile.sh /home/eoscompiler

CMD ["echo", "EOS image created"]
