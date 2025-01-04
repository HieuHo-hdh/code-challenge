// The requirement has an uncertainty for the starting point. I'll add second parameter for starting poing, if no number is provided, it will start from 0.
  // sum_to_n_a(5, 1) => 15
  // sum_to_n_a(5, 2) => 14
  // sum_to_n_a(5, -1) => 14
  // sum_to_n_a(5, -2) => 12
  // sum_to_n_a(5) => 15
  // sum_to_n_a('5') => Not type of number
  // sum_to_n_a(5, 1) => starting point must be smaller than n
// There is another uncertainty when n is negative integer. Then I'll return n if n is negative integer and starting point is not provided.
  // sum_to_n_a(-5) => -5
  // sum_to_n_a(-1, -5) => -15
  // sum_to_n_a(1, -5) => -14
  // sum_to_n_a(-1, -5) => starting point must be smaller than n

  function isValidNumbers(n, startingPoint) {
    if (Number.isInteger(n)) {
      if (startingPoint) {
        if (Number.isInteger(startingPoint)) {
          if (n >= startingPoint) {
            return true;
          } else {
            console.error('starting point must be smaller than n');
            return false;
          }
        } else {
          console.error('starting point is not integer');
          return false;
        }
      } else return true;
    } else {
      console.error('n is not integer');
      return false;
    }
  }
  
  var sum_to_n_a = function(n, startingPoint) {
    if (!isValidNumbers(n, startingPoint)) return;
    if (n < 0 && !startingPoint) return n;
  
    let total = 0;
    for (let i = startingPoint || 0; i <= n; i++) {
      total += i;
    }
  
    console.log('sum_to_n_a --- result:', total);
    return total
  };
  
  var sum_to_n_b = function(n, startingPoint) {
    if (!isValidNumbers(n, startingPoint)) return;
    if (n < 0 && !startingPoint) return n;
  
    let total = 0;
    let start = startingPoint || 0;
    while (start <= n) {
      total += start;
      start++;
    }
    console.log('sum_to_n_b --- result:', total);
    return total
  };
  
  var sum_to_n_c = function(n, startingPoint) {
    if (!isValidNumbers(n, startingPoint)) return;
    if (n < 0 && !startingPoint) return n;
  
    let total = 0;
    let start = startingPoint || 0;
    const sum = function calculateSum () {
      if (start === n + 1) {
        return;
      }
      else {
        total += start || 0;
        start++;
        calculateSum();
      }
    }
    sum();
    console.log('sum_to_n_c --- result:', total);
    return total
  };