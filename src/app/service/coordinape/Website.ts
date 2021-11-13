import { CommandContext } from "slash-create";

export const Website = async (ctx: CommandContext) => {
    await ctx.channel.sned()
};