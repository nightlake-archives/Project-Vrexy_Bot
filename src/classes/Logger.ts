import { bold, yellow, blue, red } from 'picocolors';

export default class Logger {
	getDate() {
		return new Date().toTimeString().split(' ')[0];
	}

	log(message: string) {
		console.log(bold(blue(`${this.getDate()} LOG`)), message);
	}

	warn(message: string) {
		console.warn(bold(yellow(`${this.getDate()} WARN`)), message);
	}

	error(message: string) {
		console.error(bold(red(`${this.getDate()} ERROR`)), message);
	}
}