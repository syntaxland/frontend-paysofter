// ToggleApiKeyStatus.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleApiKeyStatus } from "../../redux/actions/settingsActions";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

function ToggleApiKeyStatus() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const toggleApiKeyStatusState = useSelector(
    (state) => state.toggleApiKeyStatusState
  );
  const { success, error, loading } = toggleApiKeyStatusState;

  const [showToggleApiKeyStatus, setShowToggleApiKeyStatus] = useState(false);

  const handleToggleApiKeyStatusOpen = () => {
    setShowToggleApiKeyStatus(true);
  };

  const handleToggleApiKeyStatusClose = () => {
    setShowToggleApiKeyStatus(false);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  const handleToggleApiKeyStatus = () => {
    dispatch(toggleApiKeyStatus());
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col>
          <Modal
            show={showToggleApiKeyStatus}
            onHide={handleToggleApiKeyStatusClose}
          >
            <Modal.Header
              closeButton
            >
              <Modal.Title className="text-center w-100 py-2">
                Toggle API Key Status
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center py-2">
              <div className="d-flex justify-content-center text-center py-2">
                {loading && <Loader />}
                {success && (
                  <Message variant="success">
                    API key status toggled successfully.
                  </Message>
                )}
                {error && <Message variant="danger">{error}</Message>}
              </div>

              <div className="rounded mt-2 py-2 text-center">
                <i
                  className="fa fa-warning text-warning"
                  style={{
                    fontSize: "18px",
                  }}
                ></i>{" "}
                Warning! This action will toggle api key status.{" "}
                <Button
                  variant="outline-success"
                  onClick={handleToggleApiKeyStatus}
                  className="rounded"
                  size="sm"
                  title="Toggle API key mode."
                  disabled={loading}
                >
                  Toggle
                </Button>
              </div>

              {/* {showToggleApiKeyStatus && < />} */}
            </Modal.Body>
          </Modal>

          <div className="d-flex justify-content-end">
            <Button
              variant="outline-transparent"
              onClick={handleToggleApiKeyStatusOpen}
              className="rounded"
              size="sm"
              title="Toggle API key mode."
              disabled={loading}
            >
              {profile?.is_api_key_live ? (
                <>
                  <i
                    className="fa fa-toggle-on"
                    style={{ fontSize: "16px", color: "green" }}
                  ></i>{" "}
                  <i style={{ fontSize: "14px", color: "green" }}>Live mode </i>
                </>
              ) : (
                <>
                  <i
                    className="fa fa-toggle-off"
                    style={{ fontSize: "16px", color: "red" }}
                  ></i>{" "}
                  <i style={{ fontSize: "14px", color: "red" }}>Test mode </i>
                </>
              )}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ToggleApiKeyStatus;
