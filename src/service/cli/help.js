'use strict';

const chalk = require(`chalk`);

module.exports = {
	name: `--help`,
	run() {
		const text = `
    Программа формирует файл с данными для api.
    Гайд:
      Команды:
      --version:            выводит номер версии
      --help:               печатает этот текст
      --generate <count>    формирует файл mocks.json
    `;

		console.log(chalk.gray(text));
	}
};
