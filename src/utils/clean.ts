import { VrexyClient } from 'src/classes/Client';
import { inspect } from 'util';

export default async function clean(bot: VrexyClient, text: unknown): Promise<string> {
	const inspectedText = inspect(await text, { depth: 1 });
	return inspectedText.replaceAll(bot.token, 'No!');
}