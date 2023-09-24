import httpClient from "../utils/httpClient";

export const login = async (data: any): Promise<any> => {
  const response = await httpClient.post(`/auth/login`, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getDurable = async (
  res: any,
  pageCurrent: number
): Promise<any> => {
  const user_id = res.user_id;
  const token = res.token;
  const data: any = {
    user_id: user_id,
    page: pageCurrent,
  };
  const response = await httpClient.post(`/durable`, data, {
    headers: {
      // Authorization: "Bearer " + token,
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getDurableByid = async (id: any, token: any): Promise<any> => {
  const response = await httpClient.get(`/durable/byid/${id}`, {
    headers: {
      // Authorization: "Bearer " + token,
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// setCheckDurable
export const setCheckDurable = async (result: any): Promise<any> => {
  const id = result.id;
  const check_status = result.check_status;
  const token = result.token;
  const response = await httpClient.post(
    `/durable/check`,
    {
      id_durable: id,
      check_status: check_status,
    },
    {
      headers: {
        // Authorization: "Bearer " + token,
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const updateCheckDurable = async (result: any): Promise<any> => {
  const id = result.id;
  const check_status = result.check_status;
  const token = result.token;
  const response = await httpClient.post(
    `/durable/updatecheck`,
    {
      id_durable: id,
      check_status: check_status,
    },
    {
      headers: {
        // Authorization: "Bearer " + token,
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getScannerDurable = async (
  user_id: number,
  barcode: any,
  token: any
): Promise<any> => {
  const data: any = {
    user_id: user_id,
    barcode: barcode,
  };
  const response = await httpClient.post(`/durable/scanner`, data, {
    headers: {
      // Authorization: "Bearer " + token,
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getTotalDurableByUserId = async (
  user_id: number,
  token: any
): Promise<any> => {
  const response = await httpClient.get(`/durable/${user_id}`, {
    headers: {
      // Authorization: "Bearer " + token,
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getChartUser = async (
  user_id: number,
  token: any
): Promise<any> => {
  const response = await httpClient.get(`/durable/piechart/${user_id}`, {
    headers: {
      // Authorization: "Bearer " + token,
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const searchDurable = async (
  user_id: number,
  token: any,
  search: any
): Promise<any> => {
  const response = await httpClient.get(
    `/durable/search/${user_id}/${search}`,
    {
      headers: {
        // Authorization: "Bearer " + token,
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
