import axios from "axios";
import { API, PATH_ALL_CRYPTO} from "../../config/globalVars";

const getCryptos = async (req: any, res: any) => {
  const result = await axios.get(API + PATH_ALL_CRYPTO)
  res.status(200).json(result.data);
}

export default getCryptos;