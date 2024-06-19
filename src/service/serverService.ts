import httpClient from "../utils/httpClient";

export const login = async (data: any): Promise<any> => {
  const response = await httpClient.post(`/auth/login`, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getDurable = async (
  user_id: string,
  pageCurrent: number
): Promise<any> => {
  const data: any = {
    user_id: user_id,
    page: pageCurrent,
  };
  // console.log(data);
  const response = await httpClient.post(`/durable`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getDurableById = async (id: any, token: string): Promise<any> => {
  const response = await httpClient.get(`/durable/byid/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// setCheckDurable
export const setCheckDurable = async (result: any): Promise<any> => {
  const id = result.id;
  const check_status = result.check_status;
  const response = await httpClient.post(
    `/durable/check`,
    {
      id_durable: id,
      check_status: check_status,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const updateCheckDurable = async (result: any): Promise<any> => {
  const id = result.id;
  const check_status = result?.check_status;
  const response = await httpClient.post(
    `/durable/updatecheck`,
    {
      id_durable: id,
      check_status: check_status,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const updateImage = async (result: any): Promise<any> => {
  console.log(result);
  const response = await httpClient.post("/durable/uploadimage", result, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getScannerDurable = async (
  user_id: number,
  barcode: any
): Promise<any> => {
  const data: any = {
    user_id: user_id,
    barcode: barcode,
  };
  const response = await httpClient.post(`/durable/scanner`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getTotalDurableByUserId = async (
  user_id: number
): Promise<any> => {
  const response = await httpClient.get(`/durable/${user_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getChartUser = async (user_id: number): Promise<any> => {
  const response = await httpClient.get(`/durable/piechart/${user_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const searchDurable = async (
  user_id: number,
  search: any
): Promise<any> => {
  const response = await httpClient.get(
    `/durable/search/${user_id}/${search}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
