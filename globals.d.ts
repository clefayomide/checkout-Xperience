declare global {
	interface Window {
		grecaptcha: {
			ready(callback: () => void): void;
			execute(siteKey: string, options: { action: string }): Promise<string>;
			render(
				domElementId: string,
				config: {
					sitekey: string | undefined;
					theme: string;
					callback: (token: string) => Promise<void>;
				}
			);
			reset(): void;
		};
	}
}
export {};
