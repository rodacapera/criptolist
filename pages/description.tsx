import { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// import { getDetailCryptoAction } from "../../redux/reducers/cryptoReducer";
import { getMarketCryptoAction } from "../redux/reducers/marketReducer";
import useScript from "react-script-hook";
import Image from "next/image";
import { PageHeader, List, Avatar, Skeleton, Divider, Spin, Row, Col } from "antd";
import Router from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
interface IRecipeState {
  crypto: any;
  market: any;
}

const Description: NextPage = () => {
  const { query } = useRouter();
  const id: any = query.id;
  const name_id: any = query.name_id;
  const routess: any | any[] = query.routes;
  const dispatch = useDispatch();
  const title = `Description to ${name_id}`;
  // const cryptoListDetail = useSelector(
  //   (state: IRecipeState) => state.crypto.array
  // );
  const marketList = useSelector((state: IRecipeState) => state.market.array);
  const [data, setData] = useState<any[]>([]);
  useScript({ src: "https://widget.coinlore.com/widgets/ticker-widget.js" });
  const widget = useScript({ src: "https://widget.coinlore.com/widgets/new-widget.js" });
  const routes: any = routess ? JSON.parse(routess) : [];
  const custom = (props: any) => {
    return (
      <div>
        {props.breadcrumb.routes.map((element: any, key: number) => {
          return (
            <a
              key={key}
              href="#"
              style={{ color: key === 0 ? "#ccc" : "#000" }}
              onClick={(e) => (e.preventDefault(), key === 0 ? Router.back() : null)}
            >
              {" "}
              {element.breadcrumbName} {key === 0 && "/"}{" "}
            </a>
          );
        })}
      </div>
    );
  };

  const loadMoreData = useCallback(() => {
    marketList.length > 0 && data.length === 0 && setData([...data, ...marketList]);
  }, [marketList]);

  useEffect(() => {
      loadMoreData();
  }, [loadMoreData]);

  useEffect(() => {
    dispatch(getMarketCryptoAction(id));
    // dispatch(getDetailCryptoAction(id));
  }, [dispatch, id]);

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
      <div style={{ marginTop: 20 }}></div>
      <PageHeader
          className="site-page-header"
          title={title}
          breadcrumb={{ routes }}
          breadcrumbRender={custom}
          subTitle="Data for the cryptocurrency"
        />
      <div className={styles.container}>
        <Row>
          <Col className={styles.description_container} xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }}>
            <div className={styles.precharge}>
              {!widget[0] ? (
                <div
                  className="coinlore-coin-widget"
                  data-mcap="1"
                  data-mcurrency="usd"
                  data-d7="1"
                  data-cwidth="100%"
                  data-rank="1"
                  data-vol="2"
                  data-id={name_id}
                  data-bcolor="#fff"
                  data-tcolor="#333"
                  data-ccolor="#333"
                  data-pcolor="#333"
                ></div>
              ) : (<div className={styles.center}><Spin /> Loading ...</div>)}
            </div>
          </Col>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 14, offset: 2 }}>
            <h3>Markets For Coin</h3>
            <div
              id="scrollableDiv"
              style={{
                height: 400,
                // width: "80%",
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
                marginBottom: 30,
              }}
            >
              {data.length > 1 ? (
                <InfiniteScroll
                  dataLength={data.length}
                  next={loadMoreData}
                  hasMore={data.length < 50}
                  loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                  endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                  scrollableTarget="scrollableDiv"
                >
                  <List
                    dataSource={data}
                    renderItem={(item: {
                      id: number;
                      name: string;
                      base: string;
                      price: number;
                      price_usd: number;
                    }) => (
                      <List.Item key={item.id}>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={
                                "https://i.picsum.photos/id/180/2400/1600.jpg?hmac=Ig-CXcpNdmh51k3kXpNqNqcDYTwXCIaonYiBOnLXBb8"
                              }
                            />
                          }
                          title={<a href="#">{item.name}</a>}
                          description={item.base + " " + item.price}
                        />
                        <div>
                          ${" "}
                          {parseFloat(
                            Math.round(item.price_usd).toString()
                          ).toFixed(2)}
                        </div>
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              ) : (
                <div className={styles.center}><Spin /> Loading ...</div>
              )}
            </div>
          </Col>
        </Row>
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

export default Description;
