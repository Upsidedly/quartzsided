export function isAlphaNum(str: string) {
    for ( let i = 0, len = str.length, code = 0; i < len; ++i ) {
      code = str.charCodeAt( i ); 
      if ((code > 47 && code < 58) || (code > 64 && code < 91) || (code > 96 && code < 123)) continue
      return false
    }
    return true;
};

export function isAlpha(str: string) {
    for ( let i = 0, len = str.length, code = 0; i < len; ++i ) {
      code = str.charCodeAt(i); 
      if ((code > 64 && code < 91) || (code > 96 && code < 123)) continue;
      return false
    }
    return true;
};

export default { isAlphaNum, isAlpha };