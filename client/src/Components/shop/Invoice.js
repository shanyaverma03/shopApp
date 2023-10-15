import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../store/auth-context";

const Invoice = () => {
  const { orderId } = useParams();
  const [invoiceData, setInvoiceData] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }

    const getInvoice = async () => {
      try {
        console.log(orderId);
        const response = await axios(`/orders/${orderId}`);
        console.log(response);
        setInvoiceData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getInvoice();
  }, []);
  return <div>{invoiceData}</div>;
};

export default Invoice;
