const exec = require('child-process-promise').exec;

const Container = {
    run: (containerName, command, callback) => {
        Container.command('run', containerName, command, callback);
    },
    exec: (containerName, command, callback) => {
        Container.command('exec', containerName, command, callback);
    },
    command: (commandName, containerName, command, callback) => {
        exec(`docker-compose ${commandName} ${containerName} ${command}`)
            .then(callback)
            .catch(callback);
    }
};

module.exports = Container;
