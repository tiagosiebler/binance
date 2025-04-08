export const WS_ERROR_CODE = {
  /**
   * { code: -1125, msg: 'This listenKey does not exist.' },
   */
  LISTEN_KEY_NOT_FOUND: -1125,
  /**
   * {"code":-2015,"msg":"Invalid API-key, IP, or permissions for action."}
   */
  INVALID_API_KEY_OR_IP_OR_PERMISSIONS: -2015,
} as const;

export function isFatalWSError(e: any): boolean {
  if (typeof e?.error?.code === 'number') {
    const errorCode = e.error.code;

    const FATAL_ERRORS = [WS_ERROR_CODE.INVALID_API_KEY_OR_IP_OR_PERMISSIONS];
    return FATAL_ERRORS.includes(errorCode);
  }
  return false;
}
