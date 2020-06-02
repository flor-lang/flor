/**
 * Conditional Expression
 * 
 * Evaluates _condition_ and executes _then_ or _else_ blocks
 * 
 * If _else_ is not defined and condition evalatuation is false, variable is returned,
 * if variable is not defined, null is returned
 * 
 * @param {*} variable Lhs: Variable of assignment
 * @param {*} condition Expression conditional
 * @param {*} _then_ Then Block
 * @param {*} _else_ Else Block
 */
const __cdt_expr__ = (variable, condition, _then_, _else_) => (
  (_else_)
    ? (condition ? _then_ : _else_)
    : (condition ? _then_ : (variable || null))
)

/**
 * Nullish Coalescing
 * 
 * Return expression if it is not undefined or null, otherwise returns rhs
 * 
 * @param {*} expression Expression to be evaluated
 * @param {*} rhs Default value: null
 */
const __nullish_coalesce__ = (expression, rhs = null) => {
  if (typeof expression === 'undefined' || expression === null) {
    return rhs
  }
  return expression
}

/**
 * Flor Expression
 * 
 * Wrap common expression to returns null if undefined values is evaluated
 * 
 * @param {*} expression Common flor expression
 */
const __expr__ = (expression) => __nullish_coalesce__(expression)
