import { useState } from "react";
import "../global.css";

function App() {
	const [originalURL, setOriginalURL] = useState("");
	const [shortenedURL, setShortenedURL] = useState("");
	const [linkHistory, setLinkHistory] = useState([]);

	function getOriginalURL(event: React.ChangeEvent<HTMLInputElement>) {
		setOriginalURL(event.target.value);
		console.log(event.target.value);
	}

	return (
		<div className="appBody">
			<header>
				<h1>LINK SHORTENER</h1>
			</header>
			<main>
				<div className="mainContainer">
					<div className="linkFormContainer">
						<form className="linkForm">
							<input
								type="text"
								placeholder="Insira sua URL aqui"
								onChange={getOriginalURL}
							/>
							<button className="shortURLButton" type="button">
								Encurtar
							</button>
						</form>
					</div>

					<div className="shrinkedURLContainer">
						<h2>URL Encurtada:</h2>
						<div className="shortenedURLContainer">
							<a href="#">http://localhost:3000</a>
							<button>Copiar</button>
						</div>
					</div>

					<div className="URLHistoryContainer">
						<ol>
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
