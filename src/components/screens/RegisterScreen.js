// RegisterScreen.js
import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions";
import { sendEmailOtp } from "../../redux/actions/emailOtpActions";
import FormContainer from "../FormContainer";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// import GoogleLoginScreen from "./GoogleLoginScreen";

function RegisterScreen({ location, history }) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const dispatch = useDispatch();
  const [selectedCountry] = useState("US");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isTermsConditionsRead, setIsTermsConditionsRead] = useState(false);
  const [termsConditionsError, setTermsConditionsError] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const [isValid, setIsValid] = useState({
    username: false,
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    password: false,
    confirmPassword: false,
  });

  const userRegister = useSelector((state) => state.userRegister);
  const { error, success, loading } = userRegister;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  useEffect(() => {
    // Extract referral code from the URL query parameters
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");

    if (ref) {
      setReferralCode(ref);
    }
  }, [location.search]);

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "isTermsConditionsRead":
        setIsTermsConditionsRead(value);
        setTermsConditionsError("");
        break;

      default:
        break;
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "confirmPassword") {
      setIsValid((prevIsValid) => ({
        ...prevIsValid,
        [field]: value === password,
      }));
    } else if (field === "username") {
      const containsSpecialChars = /[^a-zA-Z0-9_]/.test(value);
      setIsValid((prevIsValid) => ({
        ...prevIsValid,
        [field]: !containsSpecialChars,
      }));

      if (containsSpecialChars) {
        setUsernameError("Username must not contain special characters.");
      } else if (username.length < 6) {
        setUsernameError("Username must be at least 6 characters.");
      } else if (password !== confirmPassword) {
        setPasswordError("Passwords do not match.");
      } else if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters.");
      } else {
        setUsernameError("");
        setPasswordError("");
      }
    } else {
      setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: !!value }));
    }
  };

  const lowerCaseEmail = email.toLowerCase();

  // const formData = {
  //   first_name: firstName,
  //   last_name: lastName,
  //   username: lowerCaseEmail,
  //   email: lowerCaseEmail,
  //   password,
  //   phone_number: phoneNumber,
  //   referral_code: referralCode,
  // };

  const formData = useMemo(() => {
    return {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: lowerCaseEmail,
      password,
      phone_number: phoneNumber,
      referral_code: referralCode,
      is_terms_conditions_read: isTermsConditionsRead, 
    };
  }, [
    username,
    firstName,
    lastName,
    lowerCaseEmail,
    password,
    phoneNumber,
    referralCode,
    isTermsConditionsRead,
  ]);

  console.log("formData:", formData);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isTermsConditionsRead) {
      setTermsConditionsError("Please accept the terms and conditions.");
      return;
    } else {
      setTermsConditionsError("");
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else if (username.length < 6) {
      setUsernameError("Username must be at least 6 characters.");
    } else if (/[^a-zA-Z0-9_]/.test(username)) {
      setUsernameError("Username must not contain special characters.");
    } else {
      setUsernameError("");
      setPasswordError("");
      console.log("Dispatching registration...");

      try {
        // localStorage.setItem("registrationData", JSON.stringify(formData));
        dispatch(register(formData));
        // dispatch(sendEmailOtp(email, firstName));
      } catch (error) {
        console.log("Error object:", error);
      }
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(sendEmailOtp(email, firstName));
      // localStorage.setItem("registrationData", JSON.stringify(formData));
      const timer = setTimeout(() => {
        history.push("/verify-email-otp");
        // window.location.href = "/verify-email-otp";
      }, 5000);
      return () => clearTimeout(timer);
    }

    // eslint-disable-next-line
  }, [dispatch, success, history, email, firstName, formData]);

  const handleTermsAndConditions = () => {
    window.location.href = "/terms-and-conditions";
  };

  return (
    <Container>
      <FormContainer>
        <h1 className="text-center">Register</h1>
        {success && (
          <Message variant="success">
            Registration submitted successfully and verification OTP sent to:{" "}
            {email}
          </Message>
        )}

        {/* {passwordError && <Message variant="danger">{passwordError}</Message>} */}
        {error && <Message variant="danger">{error}</Message>}

        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>
              <i className="fas fa-user"></i> Username
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              maxLength={30}
              onChange={(e) => {
                setUsername(e.target.value);
                handleInputChange("username", e.target.value);
              }}
              required
              className={`rounded ${
                error && error.username
                  ? "is-invalid"
                  : isValid.username
                  ? "is-valid"
                  : ""
              }`}
            />

            <div className="valid-feedback">
              {isValid.username && username && (
                <i className="bi bi-check2-circle text-success"></i>
              )}
            </div>

            <Form.Control.Feedback type="invalid">
              {error && error.username}
            </Form.Control.Feedback>
            <Form.Text className="text-danger">{usernameError}</Form.Text>
          </Form.Group>

          <Form.Group controlId="firstName">
            <Form.Label>
              <i className="fas fa-user"></i> First Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={firstName}
              maxLength={30}
              onChange={(e) => {
                setFirstName(e.target.value);
                handleInputChange("firstName", e.target.value);
              }}
              required
              className={`rounded ${
                error && error.first_name
                  ? "is-invalid"
                  : isValid.firstName
                  ? "is-valid"
                  : ""
              }`}
            />
            <div className="valid-feedback">
              {isValid.firstName && (
                <i className="bi bi-check2-circle text-success"></i>
              )}
            </div>
            <Form.Control.Feedback type="invalid">
              {error && error.first_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>
              <i className="fas fa-user"></i> Last Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              maxLength={30}
              onChange={(e) => {
                setLastName(e.target.value);
                handleInputChange("lastName", e.target.value);
              }}
              required
              className={`rounded ${
                error && error.last_name
                  ? "is-invalid"
                  : isValid.lastName
                  ? "is-valid"
                  : ""
              }`}
            />
            <div className="valid-feedback">
              {isValid.lastName && (
                <i className="bi bi-check2-circle text-success"></i>
              )}
            </div>
            <Form.Control.Feedback type="invalid">
              {error && error.last_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>
              <i className="fas fa-envelope"></i> Email Address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              maxLength={100}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange("email", e.target.value);
              }}
              required
              className={`rounded ${
                error && error.email
                  ? "is-invalid"
                  : isValid.email
                  ? "is-valid"
                  : ""
              }`}
            />
            <div className="valid-feedback">
              {isValid.email && (
                <i className="bi bi-check2-circle text-success"></i>
              )}
            </div>
            <Form.Control.Feedback type="invalid">
              {error && error.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="phoneNumber">
            <Form.Label>
              <i className="fas fa-phone-square"></i> Phone Number
            </Form.Label>
            <PhoneInput
              country={selectedCountry}
              value={phoneNumber}
              maxLength={18}
              onChange={(value) => {
                setPhoneNumber(value);
                handleInputChange("phoneNumber", value);  
              }}
              className={`form-control rounded ${
                error && error.phone_number
                  ? "is-invalid"
                  : isValid.phoneNumber
                  ? "is-valid"
                  : ""
              }`}
            />
            <div className="valid-feedback">
              {isValid.phoneNumber && (
                <i className="bi bi-check2-circle text-success"></i>
              )}
            </div>
            <Form.Control.Feedback type="invalid">
              {error && error.phone_number}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>
              <i className="fas fa-key"></i> Password
            </Form.Label>
            <Form.Control
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange("password", e.target.value);
              }}
              required
              className={`rounded ${
                error && error.password
                  ? "is-invalid"
                  : isValid.password
                  ? "is-valid"
                  : ""
              }`}
            />
            <div
              className="password-toggle-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </div>
            <Form.Control.Feedback type="invalid">
              {error && error.password}
            </Form.Control.Feedback>
            <Form.Text className="text-danger">{passwordError}</Form.Text>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                handleInputChange("confirmPassword", e.target.value);
              }}
              required
              className={`rounded ${
                error && error.confirm_password
                  ? "is-invalid"
                  : isValid.confirmPassword
                  ? "is-valid"
                  : ""
              }`}
            />
            <span
              className="password-toggle-icon"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </span>
            <Form.Control.Feedback type="invalid">
              {error && error.confirm_password}
            </Form.Control.Feedback>
            <Form.Text className="text-danger">{passwordError}</Form.Text>
          </Form.Group>

          <Form.Group className="d-flex justify-content-between">
            <Form.Check
              type="checkbox"
              label="Accept terms and conditions."
              checked={isTermsConditionsRead}
              onChange={(e) =>
                handleFieldChange("isTermsConditionsRead", e.target.checked)
              }
              className="py-2 mb-2"
            />
            <Button
              variant="outline-link"
              size="sm"
              style={{ color: "blue" }}
              onClick={handleTermsAndConditions}
              target="_blank"
            >
              Terms & Conditions
            </Button>
          </Form.Group>

          {termsConditionsError && (
            <Form.Text className="text-danger">
              {termsConditionsError}
            </Form.Text>
          )}
          <Row className="py-2">
            <Col className="text-center">
              <Button
                className=" rounded w-100"
                type="submit"
                variant="success" 
                block
              >
                {loading && <Loader />}
                <i
                  className="fas fa-registered"
                  // onClick={submitHandler}
                ></i>{" "}
                Register
              </Button>
            </Col>
          </Row>
        </Form>

        {/* <Row className="py-3">
          <Col className="text-center">
            <Button variant="danger" className="rounded w-100" block>
            <i className="fab fa-google"></i> Continue with Google
            </Button> 
          </Col>
        </Row> */}

        {/* <GoogleLoginScreen /> */}

        <Row className="py-3">
          <Col className="text-center">
            <Button
              variant="primary"
              className="rounded w-100"
              block
              onClick={() => history.push("/login")}
            >
              Already a user? Login <i className="fas fa-sign-in"></i>
            </Button>
          </Col>
        </Row>
      </FormContainer>
    </Container>
  );
}

export default RegisterScreen;
