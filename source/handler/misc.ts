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

/**
 * @param {string} str - The string to remove the characters from.
 * @returns {string} - The string with all non-ASCII characters removed.
 */
export function noASCII(str: string) {
  
  if ((str===null) || (str===''))
       return str;
 else
   str = str.toString();
  
  return str.replace(/[^\x20-\x7E]/g, '');
}

export function CodewarsSlug(str: string) {
  const tidied = noASCII(str.trim().toLowerCase()).replaceAll(/ +/g, '-')
  let final = ''
  for (const char of tidied) {
    if (isAlphaNum(char)) { final += char; continue }
    if (char === '.') { final += 'dot'; continue }
    if (char === '-') { final += char; continue }
  }
  return final
}

export const isEven = (num: number) => num % 2 == 0

export const array = {
  average: (nums: number[]) => nums.reduce((a, b) => a + b) / nums.length,
  unique: (arr: any[]) => [...new Set(arr)],
  shuffle: (arr: any[]) => arr.sort(() => 0.5 - Math.random())
}

export const string = {
  reverse: (str: string) => str.split('').reverse().join(''),
  capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
}

export const color = {
  rgbToHex: (r: number, g: number, b: number) => '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1),
  randomHex: () => `#${Math.random().toString(16).slice(2, 8)}`
}

export const notEmpty = (arr: any[]) => Array.isArray(arr) && arr.length > 0

export default { isAlphaNum, isAlpha, substringCount, string, isEven, array, color };