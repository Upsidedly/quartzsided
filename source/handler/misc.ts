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

export function substringCount(string: string, substring: string, conjunction: boolean){
  let index 
  let occurenceFrequency  = 0
  for (let i=0 ; i < string.length  ; i++){
      index = string.indexOf(substring , i)
      if (index != -1){
          if ((substring.length == 1 ) || conjunction == true) {
              i = index 
          }else {
              i = index + 1
          }
          occurenceFrequency++
      }else{
          break
      } 
  }
  return (occurenceFrequency)
}

export default { isAlphaNum, isAlpha, substringCount };