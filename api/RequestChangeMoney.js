import axios from "axios";
import { MONEY_URL_KEY, MONEY_API_KEY } from "@env";

const RequestChangeMoney = async (date) => {
  let response;
  try {
    response = await axios.get(
      MONEY_URL_KEY,
      {
        params: {
          authkey: MONEY_API_KEY,
          searchdate: date,
          data: "AP01",
        },
      }
    );
  } catch (err) {
    console.log(err);
    return false;
  }
  return response;
};

export default RequestChangeMoney;
