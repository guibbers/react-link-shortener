export type HistoryItem = {
	original: string;
	short: string;
	date: string;
};

type Props = {
	history: HistoryItem[];
};

export default function HistoryList({ history }: Props) {
	if (history.length === 0) return null;

	return (
		<div className="w-full max-w-xl mx-auto mt-10 px-4">
			<h2 className="text-xl font-semibold mb-4 text-gray-800">Histórico</h2>
			<ul className="space-y-3">
				{history.map((item, index) => (
					<li
						key={index}
						className="p-4 bg-white rounded-lg shadow border border-gray-200"
					>
						<p className="text-sm text-gray-500">{item.date}</p>
						<p className="text-blue-600 break-words text-lg">
							<strong>Shortened:</strong>{" "}
							<a
								href={item.short}
								target="_blank"
								rel="noopener noreferrer"
								className="historyShortenedLink"
							>
								{item.short}
							</a>
						</p>
						<p className="text-gray-700 break-words text-sm">
							<strong>Original:</strong> {item.original.substring(0, 40)}
							{""}
							{item.original.length >= 40 && "..."}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}
