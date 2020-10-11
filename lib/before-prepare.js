
const { spawn } = require('child_process');
const fs = require("fs");
const os = require("os");
const path = require("path");

const MODULE_NAME = 'ngrx-ns';

const configDefaults = {
    port: 8000
};

module.exports = function ($logger, hookArgs) {
    return new Promise((resolve, reject) => {
        if(!hookArgs.prepareData.watch) {
            resolve();
            return;
        }
        console.log(hookArgs);
        console.log(hookArgs.prepareData.env);
        const config = Object.assign(configDefaults, hookArgs.projectData.nsConfig.reduxDevtools || {});
        const args = ["--port", config.port];
        if(config.hostname) {
            args.push("--hostname");
            args.push(config.hostname);
        }
        const reduxDevtools = spawn("redux-devtools", args, { shell: process.platform == 'win32' });
        reduxDevtools.stdout.on('data', function (data) {
            $logger.info(data.toString());
        });
        reduxDevtools.stderr.on('data', function (data) {
            $logger.error(data.toString());
        });
        const nics = os.networkInterfaces();
		const ips = Object.keys(nics)
			.map(
				(nicName) =>
					nics[nicName].filter((binding) => binding.family === "IPv4")[0]
			)
			.filter((binding) => binding)
            .map((binding) => binding.address);
        const reduxConfig = {
            ips,
            port: config.port
        };

        fs.writeFileSync(path.join(hookArgs.projectData.projectDir, 'node_modules', MODULE_NAME, "config-file.js"), `module.exports = ${JSON.stringify(reduxConfig)};`);


        resolve();
    });
}
