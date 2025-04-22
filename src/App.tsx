import { useEffect, useState } from "react";
import "../global.css";

function App() {
	const [originalURL, setOriginalURL] = useState("");
	const [shortenedURL, setShortenedURL] = useState("");
	const [linkHistory, setLinkHistory] = useState<
		{ original: string; shortened: string; timestamp: string }[]
	>([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		console.log("isLoading mudou:", isLoading);
	}, [isLoading]);

	function getOriginalURL(event: React.ChangeEvent<HTMLInputElement>) {
		setOriginalURL(event.target.value);
	}

	async function handleShortenLink(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const url = originalURL;
		const serverURL = "http://localhost:3333/";
		setIsLoading(true);

		try {
			const response = await fetch(serverURL, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ url }),
			});

			if (!response.ok) {
				throw new Error(`${response.status}`);
			}

			const resultUrl = await response.json();
			setShortenedURL(resultUrl.shortenedURL);

			setLinkHistory((prev) => [
				...prev,
				{
					original: originalURL,
					shortened: resultUrl.shortenedURL,
					timestamp: new Date().toLocaleString(),
				},
			]);
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	}

	return (
		<div className="appBody">
			<header>
				<h1>LINK SHORTENER</h1>
			</header>
			<main>
				<div className="mainContainer">
					<div className="linkFormContainer">
						<form className="linkForm" onSubmit={handleShortenLink}>
							<input
								type="text"
								placeholder="Insira sua URL aqui"
								onChange={getOriginalURL}
							/>
							<button
								className="shortURLButton"
								type="submit"
								disabled={isLoading}
							>
								{isLoading ? "Carregando..." : "Encurtar"}
							</button>
						</form>
					</div>

					<div className="shrinkedURLContainer">
						<h2>URL Encurtada:</h2>
						<div className="shortenedURLContainer">
							{isLoading ? (
								<div className="spinner"></div>
							) : shortenedURL ? (
								<a
									className="shortenedURL"
									href={shortenedURL}
									target="_blank"
									rel="noopener noreferrer"
								>
									{shortenedURL}
								</a>
							) : null}
						</div>
					</div>

					<div className="URLHistoryContainer">
						<h2>Histórico de URLs</h2>
						<ol className="historyList">
							{linkHistory.length > 0 ? (
								linkHistory.map((item, index) => (
									<li key={index} className="historyItem">
										<div className="historyLink">
											<a
												className="shortenedLinkText"
												href={item.shortened}
												target="_blank"
												rel="noopener noreferrer"
											>
												{item.shortened}
											</a>
											<a
												className="originalLink"
												href={item.original}
												target="_blank"
												rel="noopener noreferrer"
											>
												{item.original.substring(0, 20)}{" "}
												{item.original.length >= 20 && "…"}
											</a>
											<p className="timestamp">{item.timestamp}</p>
										</div>
									</li>
								))
							) : (
								<p>Nenhum link encurtado ainda.</p>
							)}
						</ol>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
