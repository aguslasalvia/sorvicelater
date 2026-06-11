import { Routes, Route } from "react-router";
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
	);
}
