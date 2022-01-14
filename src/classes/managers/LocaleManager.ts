import { readdirSync } from 'fs';
import { Locales, LocaleStrings, LocaleType } from 'src/types/Locale.type';

export default class LocaleManager {
	locales: Record<keyof Locales, LocaleType>;

	constructor() {
		this.locales = {} as Record<keyof Locales, LocaleType>;

		const localeFiles = readdirSync(`${process.cwd()}/i18n`).filter((file: string) => file.endsWith('.json'));
		localeFiles.forEach(async localeFile => {
			const name = localeFile.split('.')[0];

			this.locales[name as keyof Locales] = await import(`${process.cwd()}/i18n/${localeFile}`);
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	format(str: string, variables: Record<string, any>): string {
		return str.replace(new RegExp('{([^{]+)}', 'g'), function(_unused, varName) {
			return variables[varName];
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get(locale: keyof Locales, localeString: LocaleStrings, variables: Record<string, any>): LocaleType[LocaleStrings] {
		const loc = this.locales[locale as keyof Locales] ?? this.locales['en-US' as keyof Locales];
		return this.format(loc[localeString], variables);
	}
}