// Mongosh operations to be done on database collections
db.poapSettings.createIndex({ voiceChannelId: 1, discordServerId: 1 }, { unique: true });
db.poapParticipants.createIndex({ voiceChannelId: 1, discordServerId: 1, discordUserId: 1 }, { unique: true });