// Header.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  Form,
} from "react-bootstrap";
import { logout } from "../redux/actions/userActions";
import "./Header.css";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;
  console.log("Header profile:", profile);

  const [keyword, setKeyword] = useState("");
  const [greeting, setGreeting] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting(`Good morning!`);
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting(`Good afternoon!`);
    } else {
      setGreeting(`Good evening!`);
    }
  }, []);

  return (
    <header>
      {/* <Navbar className="custom-dark-blue" expand="md" sticky="top"> */}
      <Navbar
        bg="primary"
        variant="dark"
        className="custom-dark-blue"
        expand="md"
        sticky="top"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <i className="fas fa-home" style={{ fontSize: "16px" }}></i>{" "}
            Paysofter
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse id="navbarCollapse">
            <Form
              className="searchBarContainer d-flex flex-grow-1 mt-2"
              onSubmit={searchHandler}
              inline={!userInfo}
            >
              <Form.Control
                type="search"
                placeholder="Search "
                className="mr-auto ml-auto rounded"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />{" "}
              <Button
                variant="primary"
                type="submit"
                className="mr-auto ml-auto rounded"
              >
                <i className="fas fa-search" style={{ fontSize: "16px" }}></i>
              </Button>
            </Form>

            <Nav className="mr-auto ml-auto">

            {userInfo ? (
              <Nav.Link as={Link} to="/dashboard">
                {" "}
                <i
                  className="fas fa-dashboard"
                  style={{ fontSize: "16px" }}
                ></i>{" "}
                Dashboard
              </Nav.Link>
              ):(<span>
              
              </span>)}

              <Nav.Link>
                <i
                  className="fas fa-hand-peace"
                  style={{ fontSize: "16px" }}
                ></i>{" "}
                <span>{greeting}</span>
              </Nav.Link>

             

              {userInfo ? (
                <>
                  <Nav.Link>
                    {userInfo.first_name
                      ? userInfo.first_name.charAt(0).toUpperCase() +
                        userInfo.first_name.slice(1)
                      : ""}{" "}
                    <img
                      src={profile.avatar}
                      alt="Avatar"
                      className="avatar"
                      style={{
                        width: "25px",
                        height: "25px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link>
                  <i
                    className="fa fa-user-circle"
                    style={{ fontSize: "16px" }}
                  ></i>
                </Nav.Link>
              )}
              <NavDropdown>
                <Nav.Link as={Link} to="#">
                  {" "}
                  Settings
                </Nav.Link>
                <NavDropdown.Divider />
              </NavDropdown>

              {!userInfo ? (
                <Nav.Link as={Link} to="/login">
                  Login{" "}
                  <i className="fa fa-sign-in" style={{ fontSize: "16px" }}></i>
                </Nav.Link>
              ) : (
                <Nav.Link onClick={logoutHandler}>
                  Logout{" "}
                  <i
                    className="fas fa-sign-out-alt"
                    style={{ fontSize: "16px" }}
                  ></i>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
