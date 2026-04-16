import { NavLink } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: '首页' },
  { to: '/wiki', label: '知识库' },
];

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">RQ</div>
    <ul className="navbar-links">
      {links.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) => isActive ? 'active' : ''}
            end={to === '/'}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
