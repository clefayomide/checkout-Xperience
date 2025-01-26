import { config } from "@/config";
import { providers } from "@/constants";
import { createCache } from "@/redis";
import {
	BaseStrategy,
	ProviderAStrategy,
	ProviderBStrategy,
	PurchaseCallResponseType,
	PurchaseDetails,
	Strategy,
	TransactionConfirmationType,
} from "@/types";
import { encrypt } from "@/utils";

// simulates a real world scenario where a payment processor is connected to multiple payment gateways, ie isw, mpgs, cybersource, etc. based on the processing gateway, the application adopts a strategy

export class PaymentProcess implements BaseStrategy {
	private strategy?: Strategy;
	private readonly purchaseDetails: PurchaseDetails;

	constructor(purchaseDetails: PurchaseDetails, strategy?: Strategy) {
		this.strategy = strategy;
		this.purchaseDetails = purchaseDetails;
	}

	public setStrategy(strategy: Strategy) {
		this.strategy = strategy;
	}

	private async createSession() {
		if (!this.strategy) {
			throw new Error("no strategy set");
		}
		try {
			const sessionId = crypto.randomUUID();
			createCache(
				encrypt(
					{ ...this.purchaseDetails, provider: this.strategy.providerName },
					config.publicEncKey
				),
				sessionId
			);
			return sessionId;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async makePayment(): Promise<PurchaseCallResponseType> {
		if (!this.strategy) {
			throw new Error("no strategy set");
		}
		try {
			const sessionId = await this.createSession();
			const result = await this.strategy.pay(sessionId, this.purchaseDetails);
			return result;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	public async confirmPayment(
		transactionRef: string
	): Promise<TransactionConfirmationType> {
		return Promise.resolve({
			status: true,
			code: 200,
			message: "Transaction was Successful",
			data: {
				amount: 100,
				transactionRef,
			},
		});
	}
}

export class ProviderStrategyA implements ProviderAStrategy {
	public providerName = providers[0];
	public async pay(
		sessionId: string
		// purchaseDetails: PurchaseDetails
	): Promise<PurchaseCallResponseType> {
		return Promise.resolve({
			status: true,
			code: 200,
			message: "successful",
			data: { pin: true, provider: this.providerName, sessionId },
		});
	}
}

export class ProviderStrategyB implements ProviderBStrategy {
	public providerName = providers[1];
	public async pay(
		sessionId: string
		// purchaseDetails: PurchaseDetails
	): Promise<PurchaseCallResponseType> {
		return Promise.resolve({
			status: true,
			code: 200,
			message: "successful",
			data: { pin: false, provider: this.providerName, sessionId },
		});
	}
}
