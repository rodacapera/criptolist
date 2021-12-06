import { useState, useEffect } from "react";
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Table from "../components/table/index";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { useSelector, connect } from "react-redux";
import myStore from "../redux/store/store";
import { getCryptoAction } from "../redux/reducers/cryptoReducer";
import { getGlobalCryptoAction } from "../redux/reducers/globalCrypto";
import { Spin, Alert, Divider, BackTop, Row, Col } from "antd";
import {
  BankOutlined,
  DollarOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import useScript from "react-script-hook";
import Image from "next/image";

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
  const cryptoList = useSelector((state: IRecipeState) => state?.crypto?.array);
  const globalCryptoList = useSelector(
    (state: IRecipeState) => state?.global?.array[0]
  );
  useScript({ src: "https://widget.coinlore.com/widgets/ticker-widget.js" });
  useScript({ src: "https://widget.coinlore.com/widgets/new-widget.js" });
  useScript({
    src: "https://widget.coinlore.com/widgets/coinlore-list-widget.js",
  });

  cryptoList.length > 0 && !loader && setLoader(true);

  useEffect(() => {
    getCrypto();
    getGlobalCrypto();
  }, [getCrypto, getGlobalCrypto, props]);

  return (
    <>
      <Image
        src="/bg4.jpg"
        alt="Banner principal"
        width={100}
        height={35}
        layout="responsive"
      />
      <div
        className="coinlore-priceticker-widget"
        data-mcurrency="usd"
        data-bcolor="#fff"
        data-scolor="#333"
        data-ccolor="#428bca"
        data-pcolor="#428bca"
      ></div>
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
          <div className={styles.container_header}>
            <Row>
              <Col className={styles.separate} xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 4 }}>
                <div
                  className="coinlore-coin-widget"
                  data-mcap="1"
                  data-mcurrency="usd"
                  data-d7="1"
                  data-cwidth="100%"
                  data-rank="1"
                  data-vol="2"
                  data-id="bitcoin"
                  data-bcolor="#fff"
                  data-tcolor="#333"
                  data-ccolor="#333"
                  data-pcolor="#333"
                ></div>
              </Col>
              <Col xs={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 2 }}>
                <div
                  className="coinlore-list-widget"
                  data-mcurrency="eur"
                  data-top="5"
                  data-cwidth="50%"
                  data-bcolor="#fff"
                  data-coincolor="#428bca"
                  data-pricecolor="#4c4c4c"
                ></div>
              </Col>
              </Row>
          </div>
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
