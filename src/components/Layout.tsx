import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const { pathname } = useLocation();
  const NavLink = ({ to, label }: { to: string; label: string }) => (
    <Link
      to={to}
      style={{
        fontWeight: pathname === to ? 'bold' : 'normal',
        textDecoration: 'none',
        padding: '6px 8px',
        borderRadius: 6,
        background: pathname === to ? '#eef' : 'transparent',
      }}
    >
      {label}
    </Link>
  );

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <NavLink to="/" label="Home" />
        <NavLink to="/itinerary" label="Itinerary" />
        <NavLink to="/tasks" label="Tasks" />
        <NavLink to="/expenses" label="Expenses" />
      </nav>
      <Outlet />
    </div>
  );
}
