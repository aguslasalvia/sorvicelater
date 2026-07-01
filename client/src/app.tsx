import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import UserLayout from "./layouts/user-layout";
import RequireAuth from "./components/RequireAuth/require-auth";
import Login from "./pages/login";
import Backlog from "./pages/backlog";
import NewTicket from "./pages/new-ticket";
import NewKnowledge from "./pages/new-knowledge";
import KnowledgeList from "./pages/knowledge-list";
import MyTickets from "./pages/my-tickets";
import Incidents from "./pages/incidents";
import TicketDetail from "./pages/ticket-detail";
import Categories from "./pages/categories";

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#ffffff",
            color: "#16181d",
            fontFamily: "Poppins",
            fontSize: "0.85rem",
            fontWeight: 500,
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.1)",
          },
          success: { iconTheme: { primary: "#f15b26", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<UserLayout />}>
            <Route path="/backlog" element={<Backlog />} />
            <Route path="/new/ticket" element={<NewTicket />} />
            <Route path="/new/knowledge" element={<NewKnowledge />} />
            <Route path="/lists/knowledge" element={<KnowledgeList />} />
            <Route path="/lists/all-tickets" element={<Incidents />} />
            <Route path="/lists/my-tickets" element={<MyTickets />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/ticket/:id" element={<TicketDetail />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
