import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCryptoAction } from "../redux/reducers/cryptoReducer";
import { getMarketCryptoAction } from "../redux/reducers/marketReducer";

export default function Description() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const cryptoListDetail = useSelector((state) => state.crypto.array);
  const marketList = useSelector((state) => state.market.array);

  console.log(cryptoListDetail, marketList);

  useEffect(() => {
        dispatch(getMarketCryptoAction(id));
        dispatch(getDetailCryptoAction(id));
  }, [dispatch, id]);
  return (
    <div>
      <h1>Hola Descripción</h1>
      <Link href="/">Home</Link>
    </div>
  );
}
