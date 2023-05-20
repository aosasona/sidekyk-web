import { Fragment, useState } from "react";
import { Toaster, toast } from "sonner";
import apisauce from "apisauce";
import type { JoinWaitlistRequest, JoinWaitlistResponse } from "../types/generated";

type WaitlistApiResponse = {
	ok: boolean;
	message: string | null;
	data: JoinWaitlistResponse | null;
	error: string | null;
	errors: Partial<JoinWaitlistRequest> | null;
};

class WaitlistApiError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "WaitlistApiError";
	}
}

export default function WaitlistForm() {
	const [data, setData] = useState<JoinWaitlistRequest>({ name: "", email: "" });
	const [focused, setFocused] = useState(false);
	const client = apisauce.create({ baseURL: import.meta.env.DEV ? "http://127.0.0.1:16000/api/v1" : "https://api.sidekyk.app/api/v1" });

	function focus() {
		setFocused(true);
	}
	function blur() {
		setFocused(false);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	async function sendRequest() {
		const response = await client.post<WaitlistApiResponse>("/waitlist", data);
		if (response.ok) {
			return response.data?.message;
		}
		if (response.data?.errors) {
			response.data.errors.name && setData({ ...data, name: "" });
			response.data.errors.email && setData({ ...data, email: "" });
		}
		throw new WaitlistApiError(response.data?.error || "Something went wrong. Please try again later.");
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		toast.promise(sendRequest, {
			loading: "Hang on...",
			success: "You've been added to the waitlist! 🎉",
			error: (err) => {
				return err instanceof WaitlistApiError ? err.message : "Something went wrong. Please try again later.";
			},
		});
	}

	return (
		<Fragment>
			<form className="mx-auto space-y-3 md:w-96 lg:mx-0" onSubmit={handleSubmit}>
				<div>
					<input
						type="text"
						value={data.name}
						onChange={handleChange}
						name="name"
						placeholder="first name"
						className="py-2 px-3 rounded-b-none border-b-0"
						onFocus={focus}
						onBlur={blur}
						required
					/>
					<div className={`h-px ${focused ? "bg-primary" : "bg-gray-300"}`} />
					<input
						type="email"
						value={data.email}
						onChange={handleChange}
						name="email"
						placeholder="email address"
						className="py-2 px-3 rounded-t-none border-t-0"
						onFocus={focus}
						onBlur={blur}
						required
					/>
				</div>
				<button type="submit">Request early access</button>
				<p className="text-xs text-center text-gray-500">Coming to iOS & Android soon.</p>
			</form>
			<Toaster position="top-center" />
		</Fragment>
	);
}
