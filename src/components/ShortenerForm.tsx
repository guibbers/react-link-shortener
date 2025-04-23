import { useState } from "react";

type Props = {
	addToHistory: (item: { original: string; short: string }) => void;
};

export default function ShortenerForm({ addToHistory }: Props) {
	const [url, setUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!url.trim()) return;
		setLoading(true);

		try {
			const res = await fetch("http://localhost:3333/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ url }),
			});
			if (!res.ok) throw new Error("Failed to shorten URL");

			const data = await res.json();
			setShortUrl(data.shortenedURL);
			addToHistory({ original: url, short: data.shortenedURL });
			setUrl("");
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-xl mx-auto mt-10 px-4 flex gap-4"
			>
				<input
					type="url"
					placeholder="Type in URL"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
				/>
				<button
					type="submit"
					disabled={loading}
					className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
				>
					{loading ? "Shortening..." : "Shorten URL"}
				</button>
			</form>

			<div className="w-full max-w-xl mx-auto mt-6 px-4 min-h-[50px] flex items-center justify-center">
				{loading ? (
					<svg
						className="animate-spin h-6 w-6 text-blue-700"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
							fill="none"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8v8z"
						/>
					</svg>
				) : (
					shortUrl && (
						<div>
							<p className="text-gray-700">Shortened URL:</p>
							<a
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline break-words"
							>
								{shortUrl}
							</a>
						</div>
					)
				)}
			</div>
		</>
	);
}
