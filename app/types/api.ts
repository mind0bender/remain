export interface SuccessResType<T> {
  success: true;
  data: T;
}

export interface ErrorResType {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

type ResType<T> = SuccessResType<T> | ErrorResType;

export default ResType;
