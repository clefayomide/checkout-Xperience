export const config = {
	siteKey: process.env.NEXT_PUBLIC_SITE_KEY,
	secretKey: process.env.SECRET_KEY,
	siteKeyV2: process.env.NEXT_PUBLIC_SITE_KEY_v2,
	secretKeyV2: process.env.SECRET_KEY_v2,
	publicEncKey: process.env.NEXT_PUBLIC_ENC_KEY,
	redisUsername: process.env.REDIS_USERNAME,
	redisPassword: process.env.REDIS_PASSWORD,
	redisHost: process.env.REDIS_HOST,
	redisPort: process.env.REDIS_PORT,
};
