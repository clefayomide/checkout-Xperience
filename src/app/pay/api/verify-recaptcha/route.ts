import { NextRequest, NextResponse } from "next/server";
import { appGenerics } from "@/constants";
import { config } from "@/config";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const token = body.token ?? "";
	const version = body.version ?? "";
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
