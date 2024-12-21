import { NextRequest, NextResponse } from "next/server";
import { appGenerics } from "@/constants";
import { config } from "@/config";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { token = "", version = "" } = body ?? {};
	const fallback = version === "v2";

	if (!token) {
		return NextResponse.json(
			{
				...appGenerics.badRequest,
				message: "token is required",
			},
			{ status: appGenerics.badRequest.code }
		);
	}
	if (!version) {
		return NextResponse.json(
			{
				...appGenerics.badRequest,
				message: "version is required",
			},
			{ status: appGenerics.badRequest.code }
		);
	}

	try {
		const res = await fetch(
			`https://www.google.com/recaptcha/api/siteverify?secret=${
				fallback ? config.secretKeyV2 : config.secretKey
			}&response=${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
				},
			}
		);
		if (res.status >= 200 && res.status <= 299) {
			const data = await res.json();
			return NextResponse.json(
				{
					...appGenerics.successfulRequest,
					message: "verification completed",
					data,
				},
				{ status: appGenerics.successfulRequest.code }
			);
		}
		throw new Error("Verification Failed");
	} catch (error) {
		return NextResponse.json(
			{
				...appGenerics.serverError,
				message: (error as Error)?.message,
			},
			{ status: appGenerics.serverError.code }
		);
	}
}
