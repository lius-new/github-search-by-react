import axios from "axios";

const searchRepo = async (param) => {
  if (!param) return Promise.reject("search param is entry");
  try {
    let resp = await axios.get(
      `https://api.github.com/search/repositories?q=${param}`
    );
    return resp.data.items;
  } catch (err) {
    return err.toString().includes("403")
      ? Promise.reject("ip blocked")
      : Promise.reject(`error fail: ${err}`);
  }
};

export { searchRepo };
