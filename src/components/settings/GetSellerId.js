// GetSellerId.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import {
  // Button,
  Container,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Loader from "../Loader";

function GetSellerId() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, profile } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <Container>
      <Row >
        <Col>
          {loading && <Loader />}
          <div className="d-flex ">
            <ListGroup className="text-center py-2">
              <ListGroup.Item>
                {profile?.is_seller_account_verified ? (
                  <span style={{ color: "green" }}>
                    <i className="fa fa-user"></i> Seller ID:{" "}
                    {profile.seller_id}{" "}
                    <i
                      className="fas fa-check-circle"
                      style={{
                        fontSize: "16px",
                        color: "green",
                      }}
                    ></i>
                  </span>
                ) : (
                  <span style={{ color: "red" }}>
                    <i className="fa fa-user"></i> Seller Not Verified{" "}
                    <i
                      className="fas fa-times-circle"
                      // style={{ fontSize: "18px", color: "red" }}
                    ></i>
                  </span>
                )}
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GetSellerId;
