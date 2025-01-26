import { config } from "@/config";
import Redis from "ioredis";

const cacheClient = new Redis(
	`rediss://default:${config.redisPassword}@obliging-hermit-58718.upstash.io:${config.redisPort}`
);

export const createCache = async (data: string, sessionId: string) => {
	await cacheClient.set(sessionId, data);
};

export const retrieveCache = async (sessionId: string) => {
	const value = await cacheClient.get(sessionId);
	return value;
};
