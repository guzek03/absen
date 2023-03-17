import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const menuLinks = [
    {
      title: "Profile",
      path: "/profile"
    },
    {
      title: "Absen",
      path: "/attendance"
    },
    {
      title: "Summary",
      path: "/summary"
    }
  ]
  const MenuItem = ({title, path}) => {
    const router = useRouter()
    return (
      <Nav.Link href={path} active={router.pathname === path}>{title}</Nav.Link>
    )
  }
  
  const forLogout = async (e) => {
    
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/">
          <Navbar.Brand>Attendance</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {menuLinks.map((item, index) => (
              <MenuItem {...item} key={index} />
            ))}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Link href="#" onClick={forLogout}>
            <Navbar.Text>
              Logout
            </Navbar.Text>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header