document.addEventListener('DOMContentLoaded', function () {
  const numbers = document.querySelectorAll('.numbers')
  const operators = document.querySelectorAll('.operators')
  const equal = document.querySelector('.equal')
  

  const input = document.getElementById('input')
  const clear = document.getElementById('clear')
  const dot = document.getElementById('dot')

  clear.onclick = empty

  const c = ['+', '-', '*', '/']
  const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  let currentString = input.innerHTML
  //   let lastChar = currentString[currentString.length - 1]

  input.addEventListener('click', display)

  operators.forEach((number) => {
    number.onclick = getOperator
  })
  numbers.forEach((number) => {
    console.log(number)
    if (number)
    number.onclick = getNumber
  })

  equal.onclick = displayResult

  function getOperator() {
    const operator = event.target.dataset.operator
    currentString = input.innerHTML
    display(operator, currentString)
  }

  function getNumber() {
    if (event.target.dataset.number){
    const number = parseInt(event.target.dataset.number)
    display(number)

    console.log(number)
    }
  }

  function display(x, currentstring) {
    if (typeof x === 'number' && num.includes(x)) {
      input.innerHTML += x
    } else if (input.innerHTML.length >= 1) {
      if (typeof x === 'string') {
        if (x === '*' || x === '/' || x === '+' || x === '-') {
          if (checkLastValue(x)) {
            let newString =
              currentstring.substring(0, currentstring.length - 1) +
              event.target.dataset.operator
            input.innerHTML = newString
          } else if (x === '*' || x === '/' || x === '+' || x === '-') {
            input.innerHTML += x}
        }
        else if (x === "."){
                console.log(x)
            }
      }
    }
  }

  function checkLastValue(x) {
    let currentString = input.innerHTML
    let lastChar = currentString[currentString.length - 1]
    if (c.includes(lastChar)) {
      return true
    }
    return false
  }

  function displayResult() {
    let currentString = String(input.innerHTML)
    console.log(currentString)
    if (currentString.length >= 1) {
      let numbers = currentString.split(/\+|\-|\*|\//g)
      console.log(numbers)
      let operators = currentString.replace(/[0-9]|\./g, '').split('')
      console.log(operators)

      var divide = operators.indexOf('/')
      console.log(divide);
      while (divide != -1) {
        numbers.splice(divide, 2, parseFloat(numbers[divide]) / parseFloat(numbers[divide + 1]))
        operators.splice(divide, 1)
        divide = operators.indexOf('/')
      }

      var multiply = operators.indexOf('*')
      console.log(multiply);
      while (multiply != -1) {
        numbers.splice(multiply, 2, parseFloat(numbers[multiply]) * parseFloat(numbers[multiply + 1]))
        operators.splice(multiply, 1)
        multiply = operators.indexOf('*')
      }

      var subtract = operators.indexOf('-')
      console.log(subtract);
      while (subtract != -1) {
        numbers.splice(subtract, 2, parseFloat(numbers[subtract]) - parseFloat(numbers[subtract + 1]))
        console.log(numbers)
        operators.splice(subtract, 1)
        subtract = operators.indexOf('-')
      }

      var add = operators.indexOf('+')
      console.log(add);
      while (add != -1) {
        // using parseFloat is necessary, otherwise it will result in string concatenation :)
        numbers.splice(add,2,parseFloat(numbers[add]) + parseFloat(numbers[add + 1]),
        )
        operators.splice(add, 1)
        add = operators.indexOf('+')

      }
      input.innerHTML = numbers[0]
    }
  }

  function empty(){
    input.innerHTML = "";
  }

})
