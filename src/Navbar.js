import './Navbar.css'

function Navbar  () {
    return (
    <nav>
        <ul className='nav-contain'>
        <li className='nav-nav'><a className='nav-list' href="/">Home</a></li>
        <li className='nav-nav'><a className='nav-list' href="/about">About</a></li>
        <li className='nav-nav'><a className='nav-list' href="/services">Services</a></li>
        <li className='nav-nav'><a className='nav-list' href="/contact">Contact</a></li>
        </ul>
    </nav>
);
};

export default Navbar;
