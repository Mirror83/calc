function infix_to_postfix(infix_expression) {
  const tokens = infix_expression.split(" ");
  const operator_stack = [];
  const output_list = [];
  const precedence = {
    "+": 1,
    "-": 0,
    "*": 2,
    "/": 3,
  };

  for (let i = 0; i < tokens.length; i++) {
    // If a token is an operand, push it to the output list.
    // If it is an operator, first pop any operators that may have higher precedence
    // than it from the operator stack and then push it to the operator stack
    if (tokens[i].match("[A-Za-z0-9]")) {
      output_list.push(tokens[i]);
    } else if (tokens[i].match("[-/+*]")) {
      while (
        operator_stack.length > 0 &&
        precedence[operator_stack[operator_stack.length - 1]] >
          precedence[tokens[i]]
      ) {
        output_list.push(operator_stack.pop());
      }
      operator_stack.push(tokens[i]);
    }
  }
  // Once the loop is done and there are still operators in the operator stack,
  // push them to the output list
  while (operator_stack.length > 0) {
    output_list.push(operator_stack.pop());
  }

  let postfixString = "";

  for (let character in output_list) {
    postfixString += output_list[character] + " ";
  }
  return postfixString;
}

function postfix_calculator(postfix_expression) {
  const tokens = postfix_expression.split(" ");
  const operation_stack = [];
  for (let token in tokens) {
    if (tokens[token].match("[0-9]")) {
      operation_stack.push(tokens[token]);
    } else if (tokens[token].match("[-/+*]")) {
      if (operation_stack.length < 2) {
        console.log("Too few operands");
        return;
      } else {
        const value2 = parseFloat(operation_stack.pop());
        const value1 = parseFloat(operation_stack.pop());
        let result = 0;

        switch (tokens[token]) {
          case "+":
            result = value1 + value2;
            break;
          case "-":
            result = value1 - value2;
            break;
          case "/":
            if (value2 === 0) return "Division by zero";
            result = value1 / value2;
            break;
          default:
            result = value1 * value2;
        }

        operation_stack.push(result);
      }
    }
  }
  const answer = operation_stack.pop();

  if (operation_stack.length === 0) {
    return answer;
  } else {
    console.log("Too many operands");
  }
}

export default function calculateString(infix_expression) {
  const postfix = infix_to_postfix(infix_expression);
  const answer = postfix_calculator(postfix);
  return answer;
}

// console.log(calculate("1 + 3 * 2"));
