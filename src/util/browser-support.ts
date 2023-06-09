function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export async function signMessage(
  message: string,
  secret: string
): Promise<string> {
  const encoder = new TextEncoder();

  if (secret.includes('PRIVATE KEY')) {
    const pemHeader = '-----BEGIN PRIVATE KEY-----';
    const pemFooter = '-----END PRIVATE KEY-----';
    const pemContents = secret.substring(
      pemHeader.length,
      secret.length - pemFooter.length
    );
    const binaryDerString = globalThis.atob(pemContents);
    const binaryDer = str2ab(binaryDerString);

    const key = await globalThis.crypto.subtle.importKey(
      'pkcs8',
      binaryDer,
      { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } },
      false,
      ['sign']
    );

    const signature = await globalThis.crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      key,
      encoder.encode(message)
    );

    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  }

  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign']
  );

  const signature = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message)
  );

  return Array.prototype.map
    .call(new Uint8Array(signature), (x: any) =>
      ('00' + x.toString(16)).slice(-2)
    )
    .join('');
}
