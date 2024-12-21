import { config } from "@/config";
import { createClient } from "redis";

export const redisClient = createClient({
	username: config.redisUsername,
	password: config.redisPassword,
	socket: {
		host: config.redisHost,
		port: Number(config.redisPort),
	},
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect();

export const createSession = async (data: [key: string], sessionId: string) => {
	await redisClient.hSet(sessionId, data);
};

export const retrieveSession = async (sessionId: string) => {
	const value = await redisClient.hGetAll(sessionId);
	return value;
};
