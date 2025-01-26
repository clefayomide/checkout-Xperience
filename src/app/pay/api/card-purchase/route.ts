import { appGenerics, providers } from "@/constants";
import {
	PaymentProcess,
	ProviderStrategyA,
	ProviderStrategyB,
} from "@/services/card";
import { getProvider } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { cardNumber = "", cvvNumber = "", expiryDate = "" } = body ?? {};

	if (!cardNumber) {
		return NextResponse.json(
			{
				...appGenerics.badRequest,
				message: "cardNumber is required",
			},
			{ status: appGenerics.badRequest.code }
		);
	}
	if (!cvvNumber) {
		return NextResponse.json(
			{
				...appGenerics.badRequest,
				message: "cvvNumber is required",
			},
			{ status: appGenerics.badRequest.code }
		);
	}

	if (!expiryDate) {
		return NextResponse.json(
			{
				...appGenerics.badRequest,
				message: "expiryDate is required",
			},
			{ status: appGenerics.badRequest.code }
		);
	}

	const purchaseDetails = {
		...body,
		amount: 2000,
	};

	const selectedProvider = getProvider();
	const paymentProcess = new PaymentProcess(
		new ProviderStrategyA(),
		purchaseDetails
	);

	switch (selectedProvider) {
		case providers[0]:
			paymentProcess.setStrategy(new ProviderStrategyA());
			break;
		case providers[1]:
			paymentProcess.setStrategy(new ProviderStrategyB());
			break;
		default:
			return NextResponse.json(
				{ ...appGenerics.badRequest, message: "Invalid provider" },
				{ status: appGenerics.badRequest.code }
			);
	}

	try {
		const response = await paymentProcess.makePayment();
		return NextResponse.json(response, {
			status: appGenerics.successfulRequest.code,
		});
	} catch (error) {
		return NextResponse.json(error, {
			status: appGenerics.serverError.code,
		});
	}
}
