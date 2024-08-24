// SellerAccountDetail.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerAccountDetail } from "../../redux/actions/sellerActions";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Accordion,
  Modal,
} from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import DatePicker from "react-datepicker";
import VerifySeller from "./VerifySeller";

function SellerAccountDetail({ seller_username }) {
  const dispatch = useDispatch();

  const getSellerAccountDetailState = useSelector(
    (state) => state.getSellerAccountDetailState
  );
  const {
    loading,
    error,
    sellerAccount,
    businessStatus,
    sellerNgnBank,
    sellerUsdBank,
    sellerBvn,
    sellerPhoto,
    businessOwnersDetails,
  } = getSellerAccountDetailState;
  console.log("sellerAccount:", sellerAccount, businessStatus, sellerBvn);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const ID_TYPE_CHOICES = [
    // ["NIN", "NIN"],
    ["Intl Passport", "Intl Passport"],
    ["Driving License", "Driving License"],
    ["Govt Issued ID", "Govt Issued ID"],
  ];

  const BUSINESS_TYPE_CHOICES = [
    ["Registered", "Registered"],
    ["Unregistered", "Unregistered"],
  ];

  const STAFF_SIZE_CHOICES = [
    ["Small", "Small (1-50 employees)"],
    ["Medium", "Medium (51-250 employees)"],
    ["Large", "Large (251+ employees)"],
  ];

  const BUSINESS_INDUSTRY_CHOICES = [
    ["Information Technology", "Information Technology"],
    ["Healthcare", "Healthcare"],
    ["Finance", "Finance"],
    ["Education", "Education"],
    ["Retail", "Retail"],
    ["Manufacturing", "Manufacturing"],
    ["Services", "Services"],
    ["Entertainment", "Entertainment"],
    ["Food & Beverage", "Food & Beverage"],
    ["Travel & Tourism", "Travel & Tourism"],
    ["Real Estate", "Real Estate"],
    ["Construction", "Construction"],
    ["Automotive", "Automotive"],
    ["Agriculture", "Agriculture"],
    ["Energy", "Energy"],
    ["Environmental", "Environmental"],
    ["Government", "Government"],
    ["Nonprofit", "Nonprofit"],
    ["Others", "Others"],
  ];

  const BUSINESS_CATEGORY_CHOICES = [
    ["Startup", "Startup"],
    ["Small Business", "Small Business"],
    ["Medium Business", "Medium Business"],
    ["Large Business", "Large Business"],
    ["Corporation", "Corporation"],
    ["Sole Proprietorship", "Sole Proprietorship"],
    ["Partnership", "Partnership"],
    ["Franchise", "Franchise"],
    ["Family Owned", "Family Owned"],
    ["Online Business", "Online Business"],
    ["Brick and Mortar", "Brick and Mortar"],
    ["Service Provider", "Service Provider"],
    ["Retailer", "Retailer"],
    ["Wholesaler", "Wholesaler"],
    ["Manufacturer", "Manufacturer"],
    ["Restaurant", "Restaurant"],
    ["Hospitality", "Hospitality"],
    ["Healthcare", "Healthcare"],
    ["Education", "Education"],
    ["Tech", "Tech"],
    ["Creative", "Creative"],
    ["Entertainment", "Entertainment"],
    ["Travel", "Travel"],
    ["Construction", "Construction"],
    ["Automotive", "Automotive"],
    ["Agriculture", "Agriculture"],
    ["Energy", "Energy"],
    ["Environmental", "Environmental"],
    ["Government", "Government"],
    ["Nonprofit", "Nonprofit"],
    ["Others", "Others"],
  ];

  // const [businessDataChanges, setBusinessDataChanges] = useState(false);
  // const [businessStatusDataChanges, setBusinessStatusDataChanges] =
  //   useState(false);
  // const [businessOwnerDataChanges, setBusinessOwnerDataChanges] =
  //   useState(false);
  // const [bankDataChanges, setBankDataChanges] = useState(false);
  // const [bvnDataChanges, setBvnDataChanges] = useState(false);
  // const [photoDataChanges, setPhotoDataChanges] = useState(false);

  const [businessData, setBusinessData] = useState({
    business_address: "",
    business_type: "",
    staff_size: "",
    business_industry: "",
    business_category: "",
    business_description: "",
    business_phone: "",
    business_email: "",
    support_email: "",
    business_website: "",
    country: "",
    business_logo: "",
  });

  const [businessStatusData, setBusinessStatusData] = useState({
    business_name: "",
    business_status: "",
    business_reg_num: "",
    business_reg_cert: "",
  });

  const [businessOwnerData, setBusinessOwnerData] = useState({
    director_name: "",
    id_type: "",
    id_number: "",
    id_card_image: "",
    dob: "",
    address: "",
    proof_of_address: "",
  });

  const [bankData, setBankData] = useState({
    account_name: "",
    bank_account_number: "",
    bank_name: "",
  });

  const [usdBankData, setUsdBankData] = useState({
    account_name: "",
    bank_account_number: "",
    bank_name: "",
  });

  const [bvnData, setBvnData] = useState({
    bvn: "",
  });

  const [photoData, setPhotoData] = useState({
    photo: "",
  });

  useEffect(() => {
    if (sellerAccount) {
      setBusinessData({
        business_name: sellerAccount?.business_name,
        trading_name: sellerAccount?.trading_name,
        // business_reg_num: sellerAccount?.business_reg_num,
        business_address: sellerAccount?.business_address,
        // business_type: sellerAccount?.business_type,
        staff_size: sellerAccount?.staff_size,
        business_industry: sellerAccount?.business_industry,
        business_category: sellerAccount?.business_category,
        business_description: sellerAccount?.business_description,
        business_phone: sellerAccount?.business_phone,
        business_email: sellerAccount?.business_email,
        support_email: sellerAccount?.support_email,
        business_website: sellerAccount?.business_website,
        country: sellerAccount?.country,
        business_logo: sellerAccount?.business_logo,
      });
      // setBusinessDataChanges(false);
    }
  }, [sellerAccount]);

  useEffect(() => {
    if (businessStatus) {
      setBusinessStatusData({
        business_name: businessStatus?.business_name,
        business_status: businessStatus?.business_status,
        business_reg_num: businessStatus?.business_reg_num,
        business_reg_cert: businessStatus?.business_reg_cert,
      });
      // setBusinessStatusDataChanges(false);
    }
  }, [businessStatus]);

  useEffect(() => {
    if (businessOwnersDetails) {
      setBusinessOwnerData({
        director_name: businessOwnersDetails?.director_name,
        id_type: businessOwnersDetails?.id_type,
        id_number: businessOwnersDetails?.id_number,
        id_card_image: businessOwnersDetails?.id_card_image,
        dob: businessOwnersDetails?.dob,
        address: businessOwnersDetails?.address,
        proof_of_address: businessOwnersDetails?.proof_of_address,
      });
      // setBusinessOwnerDataChanges(false);
    }
  }, [businessOwnersDetails]);

  useEffect(() => {
    if (sellerNgnBank) {
      setBankData({
        account_name: sellerNgnBank?.account_name,
        bank_account_number: sellerNgnBank?.bank_account_number,
        bank_name: sellerNgnBank?.bank_name,
      });
      // setBankDataChanges(false);
    }
  }, [sellerNgnBank]);

  useEffect(() => {
    if (sellerUsdBank) {
      setUsdBankData({
        account_name: sellerUsdBank?.account_name,
        bank_account_number: sellerUsdBank?.bank_account_number,
        bank_name: sellerUsdBank?.bank_name,
      });
      // setBankDataChanges(false);
    }
  }, [sellerUsdBank]);

  useEffect(() => {
    if (sellerBvn) {
      setBvnData({
        bvn: sellerBvn?.bvn,
      });
      // setBvnDataChanges(false);
    }
  }, [sellerBvn]);

  useEffect(() => {
    if (sellerPhoto) {
      setPhotoData({
        photo: sellerPhoto?.photo,
      });
      // setPhotoDataChanges(false);
    }
  }, [sellerPhoto]);

  useEffect(() => {
    dispatch(getSellerAccountDetail(seller_username));
  }, [dispatch, seller_username]);

  const [verifySellerModal, setVerifySellerModal] = useState(false);
  const handleVerifySellerOpen = () => {
    setVerifySellerModal(true);
  };
  const handleVerifySellerClose = () => {
    setVerifySellerModal(false);
  };

  return (
    <Container Fluid>
      <Row className="d-flex justify-content-center py-2">
        <h2 className="text-center py-2">
          Seller Profile <i className="fas fa-user"></i>
        </h2>

        <div className="d-flex justify-content-center text-center py-2">
          {loading && <Loader />}
          {error && (
            <Message variant="danger" fixed>
              {error}
            </Message>
          )}
        </div>
        <p className="d-flex justify-content-end">
          <i> Verified </i>
          {sellerAccount?.is_seller_verified ? (
            <i
              className="fas fa-check-circle"
              style={{ fontSize: "18px", color: "blue" }}
            ></i>
          ) : (
            <i
              className="fas fa-times-circle"
              style={{ fontSize: "18px", color: "red" }}
            ></i>
          )}
        </p>

        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Business Account</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_name"
                      value={businessData.business_name}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Trading Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="trading_name"
                      value={businessData.trading_name}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_address"
                      value={businessData.business_address}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Staff Size</Form.Label>
                    <Form.Control
                      as="select"
                      name="staff_size"
                      value={businessData.staff_size}
                    >
                      <option value="">Select Staff Size</option>
                      {STAFF_SIZE_CHOICES.map((size) => (
                        <option key={size[0]} value={size[0]}>
                          {size[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Industry</Form.Label>
                    <Form.Control
                      as="select"
                      name="business_industry"
                      value={businessData.business_industry}
                    >
                      <option value="">Select Business Industry</option>
                      {BUSINESS_INDUSTRY_CHOICES.map((industry) => (
                        <option key={industry[0]} value={industry[0]}>
                          {industry[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Category</Form.Label>
                    <Form.Control
                      as="select"
                      name="business_category"
                      value={businessData.business_category}
                    >
                      <option value="">Select Business Category</option>
                      {BUSINESS_CATEGORY_CHOICES.map((category) => (
                        <option key={category[0]} value={category[0]}>
                          {category[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_description"
                      value={businessData.business_description}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_phone"
                      value={businessData.business_phone}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_email"
                      value={businessData.business_email}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Support Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="support_email"
                      value={businessData.support_email}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Website</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_website"
                      value={businessData.business_website}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      value={businessData?.country}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Logo</Form.Label>

                    <div className="py-2">
                      {businessData?.business_logo && (
                        <img
                          src={businessData?.business_logo}
                          alt="Business Logo"
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>
                    <Form.Control type="file" name="business_logo" />
                  </Form.Group>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Business Status</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_name"
                      value={businessStatusData.business_name}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="business_status"
                      value={businessStatusData.business_status}
                    >
                      <option value="">Select Business Status</option>
                      {BUSINESS_TYPE_CHOICES.map((type) => (
                        <option key={type[0]} value={type[0]}>
                          {type[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Registration Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_reg_num"
                      value={businessStatusData.business_reg_num}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Registration Certificate</Form.Label>

                    <div className="py-2">
                      {businessStatus?.business_reg_cert && (
                        <img
                          src={businessStatus?.business_reg_cert}
                          alt="Business Reg Cert"
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>
                    <Form.Control type="file" name="business_reg_cert" />
                  </Form.Group>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Business Owner Detail</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Director Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_name"
                      value={businessOwnerData.director_name}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Personal ID Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="id_type"
                      value={businessOwnerData.id_type}
                    >
                      <option value="">ID Type</option>
                      {ID_TYPE_CHOICES.map((type) => (
                        <option key={type[0]} value={type[0]}>
                          {type[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Personal ID Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="id_number"
                      value={businessOwnerData.id_number}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>ID Card Image</Form.Label>

                    <div className="py-2">
                      {businessOwnersDetails?.id_card_image && (
                        <img
                          src={businessOwnersDetails?.id_card_image}
                          alt="ID Card "
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>
                    <Form.Control type="file" name="id_card_image" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>

                    <div>
                      <DatePicker
                        selected={
                          businessOwnerData.dob
                            ? new Date(businessOwnerData.dob)
                            : null
                        }
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        scrollableMonthYearDropdown
                        className="rounded py-2 mb-2 form-control"
                        placeholderText="Select date of birth"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={businessOwnerData.address}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Proof Of Address</Form.Label>

                    <div className="py-2">
                      {businessOwnersDetails?.proof_of_address && (
                        <img
                          src={businessOwnersDetails?.proof_of_address}
                          alt="Proof of Address"
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>
                    <Form.Control type="file" name="proof_of_address" />
                  </Form.Group>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Business Bank Account</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Account Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="account_name"
                      value={bankData.account_name}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>NGN Bank Account</Form.Label>
                    <Form.Control
                      type="text"
                      name="bank_account_number"
                      value={bankData.bank_account_number}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="bank_name"
                      value={bankData.bank_name}
                    />
                  </Form.Group>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>USD Bank Account</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Account Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="account_name"
                      value={usdBankData?.account_name}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Bank Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="bank_account_number"
                      value={usdBankData?.bank_account_number}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="bank_name"
                      value={usdBankData?.bank_name}
                    />
                  </Form.Group>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Bank Verification Number</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>BVN</Form.Label>
                    <Form.Control type="text" name="bvn" value={bvnData.bvn} />
                  </Form.Group>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>Seller Photo</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    {/* <Form.Label>Seller Photo</Form.Label> */}
                    <div className="py-2">
                      {photoData?.photo && (
                        <img
                          src={photoData.photo}
                          alt="Seller"
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>

                    <Form.Control type="file" name="photo" />
                  </Form.Group>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="d-flex justify-content-center mt-5 py-3">
            <Button
              variant="primary"
              onClick={handleVerifySellerOpen}
              className="rounded"
            >
              Verify Seller
            </Button>
          </div>

          <Row className="d-flex justify-content-center py-2">
            <Col md={6}>
              <Modal show={verifySellerModal} onHide={handleVerifySellerClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="text-center w-100 py-2">
                    Verify Seller
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {verifySellerModal && (
                    <VerifySeller seller_username={seller_username} />
                  )}
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SellerAccountDetail;
