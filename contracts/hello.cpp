#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;

class hello : public contract {
public:
    using contract::contract;

    [[eosio::action]]
    void hi(account_name user) {
        require_auth( user );
        print("Hello, ", name{user});
    }
};

EOSIO_ABI( hello, (hi))