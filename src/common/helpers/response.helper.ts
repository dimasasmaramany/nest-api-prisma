/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const successResponse = (data: any, message = 'success') => {
  return {
    status: true,
    message,
    data,
  };
};

export const emptyResponse = (message = 'data masih kosong') => {
  return {
    status: true,
    message,
    data: [],
  };
};