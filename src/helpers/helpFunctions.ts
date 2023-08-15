import jwtDecode from "jwt-decode";

export function generateId(length: number):string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function isiOS(): boolean {
  const userAgent = navigator.userAgent;
  return /iPhone|iPad|iPod/i.test(userAgent);
}

export function hexToRGBA(hex: string, alpha: number) {
  const hexValue = hex.replace('#', '');
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function isTokenExpired(token: string | null): boolean {
  if (!token) {
    return true; // If token is not provided, consider it expired
  }

  const decodedToken: { exp: number } = jwtDecode(token);
  const currentTime: number = Date.now() / 1000; // Convert to seconds

  return decodedToken.exp < currentTime;
}

export function isTokenCloseToExpired(token: string | null): boolean {
  if (!token) {
    return true; // If token is not provided, consider it expired
  }

  const decodedToken: { exp: number } = jwtDecode(token);
  const currentTime: number = Date.now() / 1000; // Convert to seconds

  return decodedToken.exp - 300 < currentTime;
}

export function isEqual(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      if (!isEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}