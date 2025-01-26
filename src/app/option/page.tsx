"use client";

import PaymentMethods from "@/components/templates/payment-methods";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const Page = () => {
	const router = useRouter();
	
	const handleSelection = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const method = Object.fromEntries(
			new FormData(e.currentTarget).entries()
		).method;
		router.push(`pay/${String(method)}`);
	};

	return (
		<form onSubmit={handleSelection} className="h-full">
			<PaymentMethods />
		</form>
	);
};

export default Page;
