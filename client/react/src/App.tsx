import { Routes, Route } from "react-router";
import UserLayout from "./layouts/UserLayout";
import Login from "./pages/Login";
import Backlog from "./pages/Backlog";
import NewTicket from "./pages/NewTicket";
import NewKnowledge from "./pages/NewKnowledge";
import KnowledgeList from "./pages/KnowledgeList";
import MyTickets from "./pages/MyTickets";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route element={<UserLayout />}>
				<Route path="/backlog" element={<Backlog />} />
				<Route path="/new/ticket" element={<NewTicket />} />
				<Route path="/new/knowledge" element={<NewKnowledge />} />
				<Route path="/lists/knowledge" element={<KnowledgeList />} />
				<Route path="/lists/myTickets" element={<MyTickets />} />
			</Route>
		</Routes>
	);
}
