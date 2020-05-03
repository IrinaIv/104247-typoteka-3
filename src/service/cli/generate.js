'use strict';

const chalk = require(`chalk`);
const moment = require(`moment`);
const fs = require(`fs`).promises;
const {
	getRandomInt,
	shuffle,
} = require(`../../utils`);

const TITLES_FILE_PATH = `./data/titles.txt`;
const ANNOUNCES_FILE_PATH = `./data/announces.txt`;
const CATEGORIES_FILE_PATH = `./data/categories.txt`;

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mock.json`;

const readContent = async (filePath) => {
	try {
		const content = await fs.readFile(filePath, `utf8`);
		return content.split(`\n`);
	} catch (err) {
		console.error(chalk.red(err));
		return [];
	}
};

const generatePublications = (count, titles, announces, categories) => (
	Array(count)
		.fill({})
		.map(() => ({
			title: titles[getRandomInt(0, titles.length - 1)],
			createdDate: moment().format(`YYYY-MM-DD HH:mm:ss`),
			announce: shuffle(announces).slice(0, 5).join(` `),
			fullText: shuffle(announces).slice(0, 8).join(` `),
			category: [categories[getRandomInt(0, categories.length - 1)]],
		}))
);

module.exports = {
	name: `--generate`,
	async run(args) {
		const [count] = args;

		if (count > MAX_COUNT) {
			return console.error(chalk.red(`Не больше 1000 публикаций`));
		}

		const titles = await readContent(TITLES_FILE_PATH);
		const announces = await readContent(ANNOUNCES_FILE_PATH);
		const categories = await readContent(CATEGORIES_FILE_PATH);

		const publicationsCount = Number.parseInt(count, 10) || DEFAULT_COUNT;
		const generatedPublications = generatePublications(
			publicationsCount,
			titles,
			announces,
			categories
		);
		const content = JSON.stringify(generatedPublications);

		try {
			await fs.writeFile(FILE_NAME, content);
			console.log(chalk.green(`Operation success. File created.`));
		} catch (err) {
			console.error(chalk.red(`Can't write data to file...`));
		}
	}
};
