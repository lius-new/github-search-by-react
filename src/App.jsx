import { useState } from "react";
import { searchRepo } from "./api/index";
import { useRequest } from "ahooks";
import { Input, List, Empty, Divider, Spin, message } from "antd";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const { data, error, loading, runAsync } = useRequest(searchRepo, {
    throttleWait: 3000,
    manual: true,
  });

  const handleEnter = async () => {
    if (!search) return;
    try {
      await runAsync(search);
      console.log("load data success");
      message.success(`load data success`);
    } catch (err) {
      message.error(error);
    }
  };

  const handleChange = (e) => {
    let search_ = e.target.value;
    if (search_) {
      setSearch(search_);
    }
  };
  const randomColor = () => {
    let random = Number.parseInt(Math.random() * 10);

    const color = [
      "red",
      "red",
      "blue",
      "green",
      "blue",
      "green",
      "red",
      "blue",
      "red",
      "green",
    ];

    return color[random];
  };

  return (
    <>
      <div className="container">
        <Input
          placeholder="Search Repo"
          onChange={handleChange}
          onPressEnter={handleEnter}
        />

        <Divider orientation="left">输入搜索内容将会为你展示: </Divider>
        <Spin spinning={loading} delay={300}>
          {data ? (
            <List
              bordered
              dataSource={data}
              renderItem={(item) => (
                <div className="repolist-item-wrapper">
                  <a className="account-wrapper" href={item.html_url}>
                    <img
                      className="avatar-wrapper"
                      src={item.owner.avatar_url}
                      alt=""
                    />
                    <h3>{item.full_name}</h3>
                  </a>
                  <p>{item.description}</p>
                  <div className="repolist-language">
                    {item.language && (
                      <p style={{ display: "flex" }}>
                        <span
                          style={{
                            display: "block",
                            marginRight: "8px",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            backgroundColor: randomColor(),
                          }}
                        ></span>
                        {item.language}
                      </p>
                    )}
                    <p>{item.stargazers_count}</p>
                  </div>
                </div>
              )}
            />
          ) : (
            <Empty />
          )}
        </Spin>
      </div>
    </>
  );
}

export default App;
