import { useState } from "react";
import "../global.css";

function App() {
	const [originalURL, setOriginalURL] = useState("");
	const [shortenedURL, setShortenedURL] = useState("");
	const [linkHistory, setLinkHistory] = useState([]);

	function getOriginalURL(event: React.ChangeEvent<HTMLInputElement>) {
		setOriginalURL(event.target.value);
	}

	async function handleShortenLink(e: Event) {
		e.preventDefault();
		const url = originalURL;
		const serverURL = "http://localhost:3333/";

		try {
			const response = await fetch(serverURL, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},

				body: JSON.stringify({
					url: url,
				}),
			});

			if (!response.ok) {
				throw new Error(`${response.status}`);
			}

			const resultUrl = await response.json();
			setShortenedURL(resultUrl.shortenedURL);
		} catch (error) {
			console.error(error.message);
		}
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
							<button className="shortURLButton" type="submit">
								Encurtar
							</button>
						</form>
					</div>

					<div className="shrinkedURLContainer">
						<h2>URL Encurtada:</h2>
						<div className="shortenedURLContainer">
							{shortenedURL && (
								<a
									className="shortenedURL"
									href={shortenedURL}
									target="_blank"
									rel="noopener noreferrer"
								>
									{shortenedURL}
								</a>
							)}
						</div>
					</div>

					<div className="URLHistoryContainer">
						<h2>Histórico de URLs</h2>
						<ol className="historyList">
							<li>
								<a href="">exemplodelink.com</a>
								<button>copiar</button>
							</li>
							<li>
								<a href="">exemplodelink.com</a>
								<button>copiar</button>
							</li>
						</ol>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
