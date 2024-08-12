// GetSellerId.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import { Button, Container, Row, Col } from "react-bootstrap";
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
      <Row className="d-flex justify-content-center py-2">
        <Col>
          {loading && <Loader />}
          <div className="d-flex">
            <span>
              <i
                className="fa fa-user"
                // style={{ fontSize: "16px", color: "red" }}
              ></i>{" "}
              Seller ID:{" "}
              <Button
                variant="outline-transparent"
                // onClick={handleVerifySeller}
                className="rounded"
                size="sm"
                title="Seller ID"
                // disabled
              >
                {profile?.seller_id ? (
                  <>
                    <i style={{ fontSize: "14px", color: "green" }}>
                      {profile?.seller_id}
                    </i>
                  </>
                ) : (
                  <>
                    <i style={{ fontSize: "14px", color: "red" }}>
                      Seller Not Verified
                    </i>
                  </>
                )}
              </Button>
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GetSellerId;
