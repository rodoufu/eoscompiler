const test = require('tape');
const async = require("async");
const contracts = require('../modules/contracts');
const fs = require('fs');
const encoding = 'utf8';

test('Contract Name', (t) => {
    async.waterfall([
        (done) => {
            fs.readFile('./contracts/hello.cpp', encoding, done);
        },
        (contents, done) => {
            t.equal(contracts.getContractName(contents), 'hello', "hello contract name");
            fs.readFile('./contracts/addressbook.cpp', encoding, done);
        },
        (contents, done) => {
            t.equal(contracts.getContractName(contents), 'addressbook', "addressbook contract name");
            fs.readFile('./contracts/addressbook_inline_action.cpp', encoding, done);
        },
        (contents, done) => {
            t.equal(contracts.getContractName(contents), 'addressbook', "addressbook inline contract name");
            done(null);
        },
        () => {
            t.end();
        }]);
});

test('Contract Methods', (t) => {
    async.waterfall([
        (done) => {
            fs.readFile('./contracts/hello.cpp', encoding, done);
        },
        (contents, done) => {
            t.deepEqual(contracts.getContractMethods(contents), ['hi'], "hello contract methods");
            fs.readFile('./contracts/addressbook.cpp', encoding, done);
        },
        (contents, done) => {
            t.deepEqual(contracts.getContractMethods(contents), ['upsert', 'erase'], "addressbook contract methods");
            fs.readFile('./contracts/addressbook_inline_action.cpp', encoding, done);
        },
        (contents, done) => {
            t.deepEqual(contracts.getContractMethods(contents), ['upsert', 'notify', 'erase'], "addressbook inline contract methods");
            done(null);
        },
        () => {
            t.end();
        }]);
});

test.onFinish(() => {
    process.exit(0)
});
