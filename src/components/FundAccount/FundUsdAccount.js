// // FundUsdAccount.js
// import React, { useState } from "react";
// // import { useSelector } from "react-redux";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import Message from "../Message";
// // import Loader from "../Loader";
// import PaymentScreen from "./PaymentScreen";

// const FundUsdAccount = () => {
//   // const fundUsdAccountState = useSelector((state) => state.fundUsdAccountState);
//   // const { loading, error } = fundUsdAccountState;

//   const [messsage, setMesssage] = useState("");
//   const [currency, setCurrency] = useState("USD");
//   const [amount, setAmount] = useState(0);
//   const [showPaymentPage, setShowPaymentPage] = useState(false);

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (amount >= 1) {
//       setShowPaymentPage(true);
//     } else {
//       setMesssage(`Minimum amount is 1 ${currency}.`);
//     }
//   };

//   return (
//     <Container>
//       {showPaymentPage ? (
//         <PaymentScreen amount={amount} currency={currency} />
//       ) : (
//         <Row className="justify-content-center">
//           <Col xs={12} md={6}>
//             <h2 className="py-3 text-center">Fund USD Account</h2>
//             {messsage && <Message variant="danger">{messsage}</Message>}
//             {/* {error && <Message variant="danger">{error}</Message>}
//             {loading && <Loader />} */}
//             <Form onSubmit={submitHandler}>
//               <Form.Group controlId="currency">
//                 <Form.Label>Currency</Form.Label>
//                 <Form.Control
//                   as="select"
//                   value={currency}
//                   onChange={(e) => setCurrency(e.target.value)}
//                 >
//                   {/* <option value="NGN">NGN</option> */}
//                   <option value="USD">USD</option>
//                 </Form.Control>
//               </Form.Group>

//               <Form.Group controlId="amount">
//                 <Form.Label>Amount</Form.Label>
//                 <Form.Control
//                   type="number"
//                   placeholder="Enter amount"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   required
//                 />
//               </Form.Group>
//               <div className="py-3 text-center">
//                 <Button
//                   className="w-100 rounded"
//                   type="submit"
//                   variant="primary"
//                 >
//                   Submit
//                 </Button>
//               </div>
//             </Form>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default FundUsdAccount;
