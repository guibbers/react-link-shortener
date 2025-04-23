import { useState } from "react";
import "../global.css";
import Header from "./components/Header";
import HistoryList, { type HistoryItem } from "./components/HistoryList";
import ShortenerForm from "./components/ShortenerForm";

function App() {
	const [history, setHistory] = useState<HistoryItem[]>([]);

	const addToHistory = (item: { original: string; short: string }) => {
		setHistory((prev) => [
			{ ...item, date: new Date().toLocaleString() },
			...prev,
		]);
	};
	return (
		<div className="appBody">
			<Header />
			<ShortenerForm addToHistory={addToHistory} />
			<HistoryList history={history} />
		</div>
	);
}

export default App;
