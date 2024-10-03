// Dashboard.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Button } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import { getUserTransactions } from "../../redux/actions/transactionActions";
import { getUserPayouts } from "../../redux/actions/payoutActions";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import { Line, Pie } from "react-chartjs-2";
import GetNgnAccountFundBalance from "../FundAccount/GetNgnAccountFundBalance";
import GetUsdAccountFundBalance from "../FundAccount/GetUsdAccountFundBalance";
import SelectCurrency from "../settings/SelectCurrency"; 
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  LinearScale,
  BarElement,
  Title,
  PointElement
);

function Dashboard() {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const userTransactions = useSelector((state) => state.userTransactions);
  const {
    loading: transactionLoading,
    error: transactionError,
    transactions,
  } = userTransactions;
  console.log("Transactions:", transactions);

  // const creditPointBal = useSelector((state) => state.creditPointBal);
  // const {
  //   loading: creditPointBalanceLoading,
  //   error: creditPointBalanceError,
  //   creditPointBalance,
  // } = creditPointBal;
  // console.log("Credit Point Balance:", creditPointBalance);

  const userPayouts = useSelector((state) => state.userPayouts);
  const { loading: payoutLoading, payouts, error: payoutError } = userPayouts;
  console.log("User Dashboard Payouts:", payouts);

  const [selectedCurrency, setSelectedCurrency] = useState(
    profile?.selected_currency
  );
  useEffect(() => {
    if (profile) {
      setSelectedCurrency(profile?.selected_currency);
    }
  }, [profile]);

  // const selectedCurrency = profile?.selected_currency;
  console.log("selected_currency:", profile?.selected_currency);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserTransactions());
    dispatch(getUserPayouts());
  }, [dispatch]);

  const lineGraphData = {
    labels: transactions?.map((transaction) =>
      new Date(transaction.timestamp).toLocaleString()
    ),
    datasets: [
      {
        label: "Amount Paid (NGN)",
        fill: false,
        bpayoutColor: "rgba(75,192,192,1)",
        bpayoutWidth: 2,
        data: transactions?.map((transaction) => transaction.amount),
        transactionIds: transactions?.map(
          (transaction) => transaction.payment_id
        ),
      },
    ],
  };

  const lineChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            if (label) {
              const index = context.dataIndex;
              const transactionId = context.dataset.transactionIds[index];
              return `${label}: NGN ${context.formattedValue} (${transactionId})`;
            }
            return null;
          },
        },
      },
    },
  };

  const paidPayoutRateData = {
    labels: [
      `Paid PayoutsPayouts (${(
        (payouts?.filter((payout) => payout.is_paid)?.length /
          payouts?.length) *
        100
      ).toFixed(1)}%)`,
      `Unpaid PayoutsPayouts (${(
        (payouts?.filter((payout) => !payout.is_paid)?.length /
          payouts?.length) *
        100
      ).toFixed(1)}%)`,
    ],
    datasets: [
      {
        data: [
          payouts?.filter((payout) => payout.is_paid)?.length,
          payouts?.filter((payout) => !payout.is_paid)?.length,
        ],
        backgroundColor: ["#1F77B4", "#FF6384"],
      },
    ],
  };

  const unfulfilledPayoutRateData = {
    labels: [
      `Delivered Payouts (${(
        (payouts?.filter((payout) => payout.is_approved)?.length /
          payouts?.length) *
        100
      ).toFixed(1)}%)`,
      `Undelivered Payouts (${(
        (payouts?.filter((payout) => !payout.is_approved)?.length /
          payouts?.length) *
        100
      ).toFixed(1)}%)`,
    ],
    datasets: [
      {
        data: [
          payouts?.filter((payout) => payout.is_approved)?.length,
          payouts?.filter((payout) => !payout.is_approved)?.length,
        ],
        backgroundColor: ["#008000", "#FFA500"],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="d-flex justify-content-center text-center">
      <Row>
        <Col>
          <div>
            {transactionLoading || payoutLoading ? (
              <Loader />
            ) : transactionError || payoutError ? (
              <Message variant="danger">
                {transactionError || payoutError}
              </Message>
            ) : (
              <div>
                <Row>
                  <Row className="py-2 d-flex justify-content-center">
                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                      <div>
                        <SelectCurrency />
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-2">
                    {selectedCurrency === "NGN" && (
                      <Row className="py-2">
                        <Col>
                          <GetNgnAccountFundBalance
                            currency={selectedCurrency}
                          />
                        </Col>
                      </Row>
                    )}

                    {selectedCurrency === "USD" && (
                      <Row className="py-2">
                        <Col>
                          <GetUsdAccountFundBalance
                            currency={selectedCurrency}
                          />
                        </Col>
                      </Row>
                    )}
                  </Row>

                  <hr />
                  <Row>
                    <h2 className="py-3">Services</h2>

                    <hr />

                    <Col>
                      <div className="py-3">
                        <Button variant="primary" className="rounded">
                          Airtime <i className="fas fa-phone"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button variant="primary" className="rounded">
                          Electricity <i className="fas fa-lightbulb"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button variant="primary" className="rounded">
                          Mobile Data <i className="fas fa-wifi"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button variant="primary" className="rounded">
                          CableTV <i className="fas fa-television"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button variant="primary" className="rounded">
                          Internet <i className="fas fa-globe"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button variant="primary" className="rounded">
                          Book Flight <i className="fa fa-plane"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button variant="primary" className="rounded">
                          Gaming <i className="fa fa-gamepad"></i>
                        </Button>
                      </div>
                    </Col>

                    <Col>
                      <div className="py-3">
                        <Button variant="primary" className="rounded">
                          POS Terminal <i className="fas fa-calculator"></i>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <hr />

                  <div className="line-graph">
                    <h2 className="py-3">Account Fund</h2>
                    <hr />
                    <Line data={lineGraphData} options={lineChartOptions} />
                  </div>

                  <hr />
                  <div className="py-3">
                    <h2 className="">
                      Paysofter Promise <i className="fas fa-money-bill"></i>
                    </h2>
                    <hr />
                    <Row>
                      <Col>
                        <h5 className="py-3">Paid Promise Rate</h5>
                        <div className="chart-container">
                          <Pie
                            data={paidPayoutRateData}
                            options={pieChartOptions}
                            width={200}
                            height={200}
                          />
                        </div>
                      </Col>

                      <Col>
                        <h5 className="py-3">Promise Approval Rate</h5>
                        <div className="chart-container">
                          <Pie
                            data={unfulfilledPayoutRateData}
                            options={pieChartOptions}
                            width={200}
                            height={200}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <hr />
                </Row>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
