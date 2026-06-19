import { Outlet } from "react-router";
import Navbar from "../components/Navbar/navbar";

export default function UserLayout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
