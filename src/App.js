import { BrowserRouter, Link } from "react-router-dom";
import AuthProvider from "./contexts/user";
import Routes from "./routes";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes/>
			</BrowserRouter>
		</AuthProvider>
  	);
}

export default App;
