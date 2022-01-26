import { bold, yellow, blue, red } from 'picocolors';

export default class Logger {
	getDate(): string {
		return new Date().toTimeString().split(' ')[0];
	}

	log(message: string): void {
		console.log(bold(blue(`${this.getDate()} LOG`)), message);
	}

	warn(message: string): void {
		console.warn(bold(yellow(`${this.getDate()} WARN`)), message);
	}

	error(message: string): void {
		console.error(bold(red(`${this.getDate()} ERROR`)), message);
	}
}