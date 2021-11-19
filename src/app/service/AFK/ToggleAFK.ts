import { GuildMember } from 'discord.js';
import ValidationError from '../../errors/ValidationError';
import ServiceUtils from '../../utils/ServiceUtils';
import Log from '../../utils/Log';
import roleIds from '../constants/roleIds';

export default async (guildMember: GuildMember): Promise<any> => {
	if (guildMember.user.id === null) {
		throw new ValidationError(`No guildMember <@${guildMember.id}>.`);
	}
	try {
		
		return await toggleAFKRoll(guildMember);
		
	} catch (e) {
		Log.error(`toggleAFKRoll error: ${e}`);
	}


};

export const toggleAFKRoll = async (guildMember: GuildMember): Promise<boolean> => {
	const AFKRole = ServiceUtils.getAFKRole(guildMember.guild.roles);
	const isAFK = ServiceUtils.hasRole(guildMember, roleIds.AFK);
	if (!isAFK) {
		await guildMember.roles.add(AFKRole);
		Log.info(`user ${guildMember.user.tag} given ${AFKRole.name} role`);
		return true;
	} else {
		await guildMember.roles.remove(AFKRole);
		Log.info(`user ${guildMember.user.tag} removed ${AFKRole.name} role`);
		return false;
	}
};

