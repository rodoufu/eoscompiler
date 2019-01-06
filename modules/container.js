const exec = require('child-process-promise').exec;

const Container = {
    /**
     * Runs a command on a stoped container.
     * @param containerName Container name.
     * @param command Command to be executed.
     * @param callback Callback with the outputs (stderr, stdout).
     */
    run: (containerName, command, callback) => {
        Container.command('run', containerName, command, callback);
    },
    /**
     * Execute a command on a running container.
     * @param containerName Container name.
     * @param command Command to be executed.
     * @param callback Callback with the outputs (stderr, stdout).
     */
    exec: (containerName, command, callback) => {
        Container.command('exec', containerName, command, callback);
    },
    /**
     * Execute a command on a docker container.
     * @param commandName Command type.
     * @param containerName Container name.
     * @param command Command to be executed.
     * @param callback Callback with the outputs (stderr, stdout).
     */
    command: (commandName, containerName, command, callback) => {
        exec(`docker-compose ${commandName} ${containerName} ${command}`)
            .then(callback)
            .catch(callback);
    }
};

module.exports = Container;
