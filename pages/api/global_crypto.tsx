import axios from "axios";
import { API, PATH_GLOBAL_CRYPTO} from "../config/globalVars";

const getGlobalCrypto = async (req: any, res: any) => {
  const result = await axios.get(API + PATH_GLOBAL_CRYPTO)
  res.status(200).json(result.data);
}

export default getGlobalCrypto;