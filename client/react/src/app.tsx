import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import UserLayout from "./layouts/user-layout";
import Login from "./pages/login";
import Backlog from "./pages/backlog";
import NewTicket from "./pages/new-ticket";
import NewKnowledge from "./pages/new-knowledge";
import KnowledgeList from "./pages/knowledge-list";
import MyTickets from "./pages/my-tickets";
import Incidents from "./pages/incidents";

export default function App() {
	return (
		<>
		<Toaster
			position="top-center"
			toastOptions={{
				duration: 4000,
				style: {
					background: "#1f1f1f",
					color: "#fff",
					fontFamily: "Poppins",
					fontSize: "0.85rem",
					border: "1px solid #2a2a2a",
				},
				success: { iconTheme: { primary: "#695cfe", secondary: "#fff" } },
				error: { iconTheme: { primary: "#ff5c5c", secondary: "#fff" } },
			}}
		/>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route element={<UserLayout />}>
				<Route path="/backlog" element={<Backlog />} />
				<Route path="/new/ticket" element={<NewTicket />} />
				<Route path="/new/knowledge" element={<NewKnowledge />} />
				<Route path="/lists/knowledge" element={<KnowledgeList />} />
				<Route path="/lists/allTickets" element={<Incidents />} />
				<Route path="/lists/myTickets" element={<MyTickets />} />
			</Route>
		</Routes>
		</>
	);
}
