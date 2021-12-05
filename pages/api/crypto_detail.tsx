import axios from "axios";
import { API, PATH_DETAIL_CRYPTO} from "../config/globalVars";

const getCryptoDetail = async (req: any, res: any) => {
  // if(req.method === 'POST'){}
  const result = await axios.get(API + PATH_DETAIL_CRYPTO + req.body.id)
  res.status(200).json(result.data);
}

export default getCryptoDetail;