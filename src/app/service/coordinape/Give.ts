import { GuildMember } from 'discord.js';
import { CommandContext } from 'slash-create';
import axios, { AxiosRequestConfig } from 'axios';
import Log, { LogUtils } from '../../utils/Log';


export const Give = async (guildMember: GuildMember, ctx: CommandContext, recipient: string, amount: number, note: string) => {
	const config: AxiosRequestConfig = {
		method: 'post',
		url: 'https://api.coordinape.com/',
		headers: {
		},
		data: {
			username: guildMember.user.username,
			recipient: recipient,
			amount: amount,
			note: note,
		},
	};
	try {
		const response = await axios.post('/give', config);
		Log.info('Coordinape Gives response', {
			indexMeta: true,
			meta: {
				data: response.data,
			},
		});
		return response.data;
	} catch (e) {
		LogUtils.logError('Failed to send Give request to Coordinape', e);
		Log.debug('Coordinape Give response', {
			indexMeta: true,
			meta: {
				error: e.toJSON,
				responseHeaders: e.response.headers,
				responseStatus: e.response.status,
				responseData: e.response.data,
			},
		});
		if (e.response.status == '400') {
			await guildMember.send({
				content: `Hmmm 🤔, this is what I found: ${e.response.data.message}`,
			});
		}
		throw new Error();
	}


};