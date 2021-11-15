import { CommandContext } from 'slash-create';

export const Help = async (ctx: CommandContext): Promise<any> => {
	return await ctx.send('Help is on the way!');
};