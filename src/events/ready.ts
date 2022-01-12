import { VrexyClient } from '../classes/Client';
module.exports = {
	name: 'ready',
	once: true,
	execute(bot: VrexyClient) {
		console.log(`[${bot.user.tag}] Logged in`);
	},
};