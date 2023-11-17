const handleResponse = async (
  func: any,
  responseCodes?: number | number[]
): Promise<{ status: boolean; data?: any; message?: string }> => {
  const accept = responseCodes || 200;
  try {
    const res = await func();
    if (
      res.status === accept ||
      (typeof accept === "object" && accept.includes(res.status))
    ) {
      return {
        status: true,
        data: res.data?.data || res?.data,
        message: res.data?.message,
      };
    } else {
      return {
        status: false,
        data: res.data?.data || res?.data,
        message:
          res.data?.message ||
          res.data?.error ||
          res.data?.Error?.[0] ||
          "Something went wrong",
      };
    }
  } catch (err: any) {
    if (
      err.response &&
      err.response.status >= 400 &&
      err.response.status < 500
    ) {
      if (err.response.status === 401)
        return {
          status: false,
          message:
            err?.response?.data?.message || "Unverified to complete the task",
        };
      else {
        return {
          status: false,
          data: err.response.data || err.response,
          message:
            err.response?.data?.message ||
            err.response?.data?.Error?.[0] ||
            err.response?.data?.[Object.keys(err.response?.data)?.[0]]?.[0] ||
            "Something went wrong",
        };
      }
    } else {
      return {
        status: false,
        message: "Something went wrong",
      };
    }
  }
};

export default handleResponse;
