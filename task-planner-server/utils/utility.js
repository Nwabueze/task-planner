
/**
 * 
 * @param {number} min Minimum number inclusive
 * @param {number} max Maximum number exclusive
 * @returns number
 */
 const  RandomNumber =  (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  };
  
  /**
   * 
   * @returns a four digit number
   */
  const PIN4digits = () => {
    let arr = '0123456789'.split('');
    const a = RandomNumber(0, 9);
    const b = RandomNumber(0, 9);
    const c = RandomNumber(0, 9);
    const d = RandomNumber(0, 9);
    
    if(a == b && a == c && a == d){
        return PIN4digits();
    }
    
    return arr[a]+""+arr[b]+""+arr[c]+""+arr[d];
  };
  
  module.exports = { PIN4digits, RandomNumber };