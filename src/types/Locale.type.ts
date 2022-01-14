export type Locales = 'en-US' | 'en-GB' | 'pl' | 'nl';

export interface LocaleType {
	META_ABOUT_TITLE: string,
	META_ABOUT_DESC: string,
	META_ABOUT_FIELDS_DEVELOPERS: string,
	META_ABOUT_FIELDS_SPECIALS: string,
	META_ABOUT_FIELDS_LINKS: string,
	META_ABOUT_LINKS_WEBSITE: string,
	META_ABOUT_LINKS_TWITTER: string,
	META_ABOUT_FIELDS_TECH: string,
	META_ABOUT_FIELDS_STATS: string,
	META_ABOUT_STATS_SERVERS: string,
	META_ABOUT_STATS_USERS: string,
	META_ABOUT_VERSION: string,
}

export type LocaleStrings = keyof LocaleType;