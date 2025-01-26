export const config = {
	siteKey: process.env.NEXT_PUBLIC_SITE_KEY,
	publicEncKey: process.env.NEXT_PUBLIC_ENC_KEY as string,
	siteKeyV2: process.env.NEXT_PUBLIC_SITE_KEY_v2,
	secretKey: process.env.SECRET_KEY,
	secretKeyV2: process.env.SECRET_KEY_v2,
	redisPassword: process.env.REDIS_PASSWORD,
	redisPort: process.env.REDIS_PORT,
};
