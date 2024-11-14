import PaymentMethods from "@/components/templates/payment-methods";
import Form from "next/form";
import { redirect } from "next/navigation";

const page = () => {
	async function handleOption(formData: FormData) {
		"use server";
		const option = formData.get("method");
		redirect(`/pay/${option}`);
	}
	return (
		<Form action={handleOption} className="h-full">
			<PaymentMethods />
		</Form>
	);
};

export default page;
