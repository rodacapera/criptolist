import { useState, useRef, ReactChild, ReactFragment, ReactPortal, SetStateAction } from "react";

import "antd/dist/antd.css";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function AntTable({ data }: any) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const refInput = useRef<any>(null);
  interface IReceiptFilter {
    setSelectedKeys: any;
    selectedKeys: any;
    confirm: any;
    clearFilters: any;
  }
  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: IReceiptFilter) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={refInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: string, record: { [x: string]: { toString: () => string; }; }) =>
      record[dataIndex]? record[dataIndex].toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => refInput!.current?.select, 100);
      }
    },
    render: (text: { toString: () => string; }) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys: SetStateAction<string>[], confirm: () => void, dataIndex: SetStateAction<string>) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ['md'],
      //   width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      //   width: "20%",
      ...getColumnSearchProps("symbol"),
    },
    {
        title: "Cap. market",
        dataIndex: "price_btc",
        key: "price_btc",
        ...getColumnSearchProps("price_btc")
    },
    {
      title: "Price (USD)",
      dataIndex: "price_usd",
      key: "price_usd",
      //   width: "20%",
      ...getColumnSearchProps("price_usd"),
      render: (text: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined) => (
        <Space size="middle">
            <span>$ {text}</span>
        </Space>
      ),
    },
    {
      title: "Detail",
      dataIndex: "id",
      key: "id",
      // with: "10%",
      render: (text: string , record: { id: number; nameid: string; }) => {
        const query = {
          id: record.id, 
          name_id: record.nameid, 
          routes: JSON.stringify([
            {
              path: '/', 
              breadcrumbName: 'Home'
            }, 
            {
              path: '/description', 
              breadcrumbName: 'Description'
            }
          ]) 
        }
        return (
          <Space size="middle">
            <Link href={{pathname: '/description', query: query}} >
              Detail 
            </Link>
          </Space>
        )
      }
    },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    //   ...getColumnSearchProps("address"),
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ["descend", "ascend"],
    // },
  ];
  
  return <Table columns={columns} dataSource={data} />;
}
