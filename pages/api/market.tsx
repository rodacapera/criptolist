import axios from "axios";
import { API, PATH_MARKET_CRYPTO} from "../config/globalVars";

const getMarketCrypto = async (req: any, res: any) => {
  const result = await axios.get(API + PATH_MARKET_CRYPTO + req.body.id)
  res.status(200).json(result.data);
}

export default getMarketCrypto;