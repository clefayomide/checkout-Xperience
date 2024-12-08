import { appGenerics } from "@/constants";
import { RecaptchaResponseType } from "@/types";
import { useState } from "react";
import { config } from "@/config";

const useRecaptcha = ({ onFinish }: { onFinish: () => void }) => {
	// This code is responsible for handling the reCAPTCHA verification and fallback to v2 if necessary
	// It uses the provided reCAPTCHA site key and version (v2 or v3) based on the score obtained from the reCAPTCHA verification
	// The verification token is sent to the server for verification and the result is handled accordingly
	// If the score is above or equal to the maximum allowed score, the onFinish callback is called
	// If the score is below the maximum allowed score, the reCAPTCHA v2 is rendered and the verifyRecaptchaToken function is called again
	// The fallbackToV2 flag is used to switch between reCAPTCHA v2 and v3 when necessary

	const [showV2Checkbox, setShowV2Checkbox] = useState(false);
	let fallbackToV2 = false;
	const verifyRecaptchaToken = async (token: string) => {
		const version = fallbackToV2 ? "v2" : "v3";
		try {
			const response = await fetch("api/verify-recaptcha", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token, version }),
			});
			if (response.status >= 200 && response.status <= 299) {
				const data = (await response.json()) as RecaptchaResponseType;
				const score = data.data.score ?? 0;
				if (version === "v2") {
					window.grecaptcha.reset();
					setShowV2Checkbox(false);
					return onFinish();
				}

				if (score < appGenerics.maxRecaptchaScore) {
					fallbackToV2 = true;
					setShowV2Checkbox(true);
					return window.grecaptcha.render("recaptcha-container", {
						sitekey: config.siteKeyV2,
						theme: "light",
						callback: verifyRecaptchaToken,
					});
				}

				if (score >= appGenerics.maxRecaptchaScore) {
					setShowV2Checkbox(false);
					return onFinish();
				}
			}
			throw new Error("Failed to verify reCAPTCHA");
		} catch (error) {
			console.error(error);
			throw error;
		}
	};
	const initRecaptcha = () => {
		if (typeof window !== "undefined" && window.grecaptcha) {
			window.grecaptcha.ready(async function () {
				try {
					const token = await window.grecaptcha.execute(
						config.siteKey as string,
						{
							action: "submit",
						}
					);
					await verifyRecaptchaToken(token);
				} catch (error) {
					console.error(error);
					throw error;
				}
			});
		}
	};

	return { initRecaptcha, showV2Checkbox };
};

export default useRecaptcha;
