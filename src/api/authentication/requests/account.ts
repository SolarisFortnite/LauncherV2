import axios, { AxiosError, AxiosResponse } from "axios";
import { endpoints } from "@/api/config/endpoints";
import { Tauri } from "@/api/config/tauri";
import { AuthResponse } from "@/api/authentication/interfaces/AuthResponse";
import { ResponseOrError } from "@/api/ResponseOrError";

export const generateAccountResponse = async (
  code: string
): Promise<ResponseOrError<AuthResponse>> => {
  const issuer = Tauri.Version === "0.1.0" ? "dev 0.1.0" : `Solaris-Launcher / ${Tauri.Version}`;

  const response: AxiosResponse<AuthResponse> | AxiosError<AuthResponse> = await axios
    .get(endpoints.GET_GENERATE_ACCOUNT_RESP, {
      headers: {
        Authorization: `Bearer ${code}`,
        Issuer: issuer, // used to verify version and validate it
      },
    })
    .catch(() => new AxiosError<AuthResponse>());

  if (response instanceof Error) {
    return {
      success: false,
      data: response.response?.data!,
    };
  }

  return {
    success: true,
    data: response.data,
  };
};

export const postGenerateAccountResponse = async (code: string, ipAddress: string) => {
  const issuer = Tauri.Version === "0.1.0" ? "dev 0.1.0" : `Solaris-Launcher / ${Tauri.Version}`;

  const response: AxiosResponse<AuthResponse> | AxiosError<AuthResponse> = await axios
    .post(
      endpoints.GET_GENERATE_ACCOUNT_RESP,
      {
        ipAddress,
      },
      {
        headers: {
          Authorization: `Bearer ${code}`,
          Issuer: issuer, // used to verify version and validate it
        },
      }
    )
    .catch(() => new AxiosError<AuthResponse>());

  if (response instanceof Error) {
    return {
      success: false,
      data: response.response?.data!,
    };
  }

  return {
    success: true,
    data: response.data,
  };
};
