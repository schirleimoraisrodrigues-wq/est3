export const BrowserRouter = ({ children }) => children;
export const Routes = ({ children }) => children;
export const Route = ({ children, element }) => element || children;
export const Navigate = () => null;
export const Outlet = () => null;
export const NavLink = ({ children }) => children;
export function useNavigate() { return () => {}; }
