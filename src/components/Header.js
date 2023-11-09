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
import { getUserProfile } from "../redux/actions/userProfileActions";
import { logout } from "../redux/actions/userActions";
import "./Header.css";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const [keyword, setKeyword] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isAccountIdCopied, setIsAccountIdCopied] = useState(false);
  const [isSecurityCodeCopied, setIsSecurityCodeCopied] = useState(false);
  const [securityCodeVisible, setSecurityCodeVisible] = useState(false);

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

  const formatAccountID = (accountID) => {
    if (accountID) {
      return accountID.match(/.{1,4}/g).join("-");
    }
    return "";
  };

  // Function to copy the account ID to the clipboard
  const copyToClipboardAccountID = (text) => {
    navigator.clipboard.writeText(text);
    setIsAccountIdCopied(true);
    setTimeout(() => {
      setIsAccountIdCopied(false);
    }, 3000);
  };

  const copyToClipboardSecCode = (text) => {
    navigator.clipboard.writeText(text);
    setIsSecurityCodeCopied(true);
    setTimeout(() => {
      setIsSecurityCodeCopied(false);
    }, 3000);
  };

  const toggleSecurityCodeVisibility = () => {
    setSecurityCodeVisible(!securityCodeVisible);
  };

  // const securityCode = Math.floor(1000 + Math.random() * 9000);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting(`Good Morning!`);
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting(`Good Afternoon!`);
    } else {
      setGreeting(`Good Evening!`);
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  return (
    <header>
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
                placeholder="Search"
                className="mr-auto ml-auto rounded"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
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
              ) : (
                <span>
                  <Nav.Link as={Link} to="/login">
                    {" "}
                    <i
                      className="fas fa-dashboard"
                      style={{ fontSize: "16px" }}
                    ></i>{" "}
                    Dashboard
                  </Nav.Link>
                </span>
              )}

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

              <div>
                <NavDropdown className="profile-dropdown custom-dropdown">
                  <div>
                    {userInfo ? (
                      <>
                        <span>
                          Account ID: {formatAccountID(profile.account_id)}
                        </span>

                        <Button
                          variant="outline"
                          className="rounded"
                          size="sm"
                          onClick={() =>
                            copyToClipboardAccountID(profile.account_id)
                          }
                        >
                          {isAccountIdCopied ? (
                            <span>
                              <i className="fa fa-check"></i> Copied
                            </span>
                          ) : (
                            <span>
                              <i className="fa fa-copy"></i>
                            </span>
                          )}
                        </Button>

                        <NavDropdown.Divider />
                        <span>
                          Security Code:{" "}
                          {securityCodeVisible ? profile.security_code : "****"}
                          <Button
                            variant="outline"
                            className="rounded"
                            size="sm"
                            onClick={toggleSecurityCodeVisibility}
                          >
                            {securityCodeVisible ? (
                              <span>
                                <i className="fa fa-eye-slash"></i> Hide
                              </span>
                            ) : (
                              <span>
                                <i className="fa fa-eye"></i> Show
                              </span>
                            )}
                          </Button>
                          {/* Security Code:{" "}
                          {securityCodeVisible ? profile.security_code : "****"} */}
                        </span>
                        <Button
                          variant="outline"
                          className="rounded"
                          size="sm"
                          onClick={() =>
                            copyToClipboardSecCode(profile.security_code)
                          }
                        >
                          {isSecurityCodeCopied ? (
                            <span>
                              <i className="fa fa-check"></i> Copied
                            </span>
                          ) : (
                            <span>
                              <i className="fa fa-copy"></i>
                            </span>
                          )}
                        </Button>

                        <NavDropdown.Divider />
                        <Nav.Link
                          as={Link}
                          to="/settings"
                          className="dropdown-item"
                        >
                          {" "}
                          <i className="fas fa-gear"></i> <span>Settings</span>
                        </Nav.Link>
                        <NavDropdown.Divider />
                      </>
                    ) : (
                      <Nav.Link>
                        <>
                          {/* <Nav.Link as={Link} to="/login">
                            Login{" "}
                            <i
                              className="fa fa-sign-in"
                              style={{ fontSize: "16px" }}
                            ></i>
                          </Nav.Link> */}
                          <Nav.Link
                            as={Link}
                            to="/register"
                            className="dropdown-item"
                          >
                            Register{" "}
                            <i
                              className="fa fa-sign-in"
                              style={{ fontSize: "16px" }}
                            ></i>
                          </Nav.Link>
                        </>
                      </Nav.Link>
                    )}
                  </div>
                </NavDropdown>
              </div>

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
