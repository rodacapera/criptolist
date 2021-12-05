import { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Table from "./components/table/index";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { useDispatch, useSelector, connect } from "react-redux";
import myStore from "./redux/store";
import { getCryptoAction } from "./redux/reducers/cryptoReducer";
import { getGlobalCryptoAction } from "./redux/reducers/globalCrypto";
import { Spin, Alert, Divider, BackTop } from "antd";
import {
  BankOutlined,
  DollarOutlined,
  WalletOutlined,
} from "@ant-design/icons";

interface IRecipeProps {
  getCrypto: any;
  getGlobalCrypto: any;
}

interface IRecipeState {
  crypto: any;
  global: any;
}

const Home: NextPage<IRecipeProps> = (props) => {
  const { getCrypto, getGlobalCrypto } = props;
  const [loader, setLoader] = useState(false);
  // const dispatch = useDispatch();
  const cryptoList = useSelector((state: IRecipeState) => state?.crypto?.array);
  const globalCryptoList = useSelector(
    (state: IRecipeState) => state?.global?.array[0]
  );

  cryptoList.length > 0 && !loader && setLoader(true);
  // console.log(globalCryptoList);

  useEffect(() => {
    // dispatch(getCryptoAction());
    getCrypto();
    getGlobalCrypto();
  }, [props]);

  return (
    <>
      <Head>
        <title>CryptoList</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="/bg4.jpg"
        alt="Banner principal"
        width={100}
        height={20}
        layout="responsive"
      />
      <div className={styles.container}>
        <main className={styles.main}>
          <BackTop />
          <h1 className={styles.title}>
            Bienvenido a{" "}
            <a className={styles.noCursor} href="#">
              Crypto list!
            </a>
          </h1>

          <p className={styles.description}>
            Encuentra en un solo sitio{" "}
            <code className={styles.code}>Todas las crypto monedas</code>
          </p>

          {/* <Link href="/description">Description</Link> */}
          <div>
            <strong className={styles.noCursor}>
              <WalletOutlined /> Cryptocurrencies:{" "}
              {globalCryptoList?.coins_count} {""}
              <BankOutlined /> Markets: {globalCryptoList?.active_markets} {""}
              <DollarOutlined /> Market Cap: {globalCryptoList?.mcap_ath} {""}
            </strong>
            button.
          </div>
          <Divider />
          <div className={styles.table}>
            {!loader ? (
              <Spin tip="Loading...">
                <Alert
                  message="Alert message title"
                  description="Further details about the context of this alert."
                  type="info"
                />
              </Spin>
            ) : (
              <Table data={cryptoList} />
            )}
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://github.com/rodacapera"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <span className={styles.logo}>Rhonald Capera</span>
          </a>
        </footer>
      </div>
    </>
  );
};

export const getStaticProps = myStore.getStaticProps((store: any) => () => {
  return (
    store.dispatch(getCryptoAction()), store.dispatch(getGlobalCryptoAction())
  );
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getCrypto: bindActionCreators(getCryptoAction, dispatch),
    getGlobalCrypto: bindActionCreators(getGlobalCryptoAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Home);
