/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SignAlgorithm,
  SignEncodeMethod,
  signMessage as signMessageWebCryptoAPI,
} from './webCryptoAPI';

export async function signMessage(
  message: string,
  secret: string,
  method: SignEncodeMethod,
  algorithm: SignAlgorithm,
  pemEncodeMethod: SignEncodeMethod = method,
): Promise<string> {
  return signMessageWebCryptoAPI(message, secret, method, algorithm);
}
