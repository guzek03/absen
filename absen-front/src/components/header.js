import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

const Header = () => {
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
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header