import { readdirSync } from 'fs';
import i18next from 'i18next';
import Logger from '../Logger';
import { bold, green } from 'picocolors';

export default class LocaleManager {
	constructor() {
		const logger = new Logger();

		i18next.init({
			ns: ['common', 'meta'],
			fallbackLng: 'en-US',
			resources: {},
		});

		const localeFiles = readdirSync(`${process.cwd()}/i18n`).filter((file: string) => !file.startsWith('.'));
		localeFiles.forEach(async localeFile => {
			const namespaceFiles = readdirSync(`${process.cwd()}/i18n/${localeFile}`).filter((file: string) => file.endsWith('.json'));

			namespaceFiles.forEach(async namespaceFile => {
				const data = await import(`${process.cwd()}/i18n/${localeFile}/${namespaceFile}`);
				i18next.addResourceBundle(localeFile, namespaceFile.split('.')[0], data);
				logger.log(`${bold(green(localeFile))}: ${namespaceFile}`);
			});
		});
	}
}