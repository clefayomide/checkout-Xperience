import { createSession } from "@/redis";
import {
	BaseStrategy,
	ProviderAStrategy,
	ProviderBStrategy,
	PurchaseCallResponseType,
	PurchaseDetails,
	Strategy,
	TransactionConfirmationType,
} from "@/types";

// simulates a real world scenario where a payment processor is connected to multiple payment gateways, ie isw, mpgs, cybersource, etc. based on the processing gateway, the application adopts a strategy

export class PaymentProcess implements BaseStrategy {
	private strategy: Strategy;
	private readonly provider: string;
	private readonly purchaseDetails: PurchaseDetails;

	constructor(
		strategy: Strategy,
		provider: string,
		purchaseDetails: PurchaseDetails
	) {
		this.strategy = strategy;
		this.provider = provider;
		this.purchaseDetails = purchaseDetails;
	}

	public setStrategy(strategy: Strategy) {
		this.strategy = strategy;
	}

	public async makePayment(): Promise<PurchaseCallResponseType> {
		try {
			const result = await this.strategy.pay(
				this.provider,
				this.purchaseDetails
			);
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
	public async pay(
		provider: string,
		purchaseDetails: PurchaseDetails
	): Promise<PurchaseCallResponseType> {
		const sessionId = crypto.randomUUID();
		await createSession({ ...purchaseDetails, provider } as never, sessionId);
		return Promise.resolve({
			status: true,
			code: 200,
			message: "successful",
			data: { pin: true, provider: provider, sessionId },
		});
	}
}

export class ProviderStrategyB implements ProviderBStrategy {
	public async pay(
		provider: string,
		purchaseDetails: PurchaseDetails
	): Promise<PurchaseCallResponseType> {
		const sessionId = crypto.randomUUID();
		await createSession({ ...purchaseDetails, provider } as never, sessionId);
		return Promise.resolve({
			status: true,
			code: 200,
			message: "successful",
			data: { pin: false, provider: provider, sessionId },
		});
	}
}
