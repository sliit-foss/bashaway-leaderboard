import { orderBy } from "lodash";
import { isRegex } from "@/utils";

const transformLeaderboardData = (response, _, arg) => {
  const { page, filters, sorts } = arg;
  
  response.data = response.data.map((item, index) => ({ ...item, place: index + 1 }));
  
  filters?.split("&").forEach((filter) => {
    let [key, value] = filter.split("=");
    key = key.replace("filter[", "").replace("]", "");
    
    response.data = response.data.filter((item) =>
      isRegex(value) ? item[key].match(new RegExp(value.slice(1, -1), "i")) : item[key] === value
    );
  });
  
  if (sorts) {
    const [keys, values] = sorts.split("&").reduce(
      (acc, sort) => {
        let [key, value] = sort.split("=");
        key = key.replace("sort[", "").replace("]", "");
        acc[0].push(key);
        acc[1].push(value === "1" ? "asc" : "desc");
        return acc;
      },
      [[], []]
    );
  
    response.data = orderBy(response.data, keys, values);
  }
  
  const totalPages = Math.ceil(response.data.length / 10);
  response.data = response.data.slice((page - 1) * 10, page * 10);
  
  return {
    data: {
      docs: response.data,
      totalPages
    },
    message: response.message
  };
};

export default transformLeaderboardData;
