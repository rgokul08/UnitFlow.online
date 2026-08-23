/** UnitFlow style: a deliberately small safe arithmetic parser; never executes arbitrary code. */
function tokenize(source) {
  const compact = source.replace(/\s+/g, "");
  if (!compact) return [];
  const tokens = compact.match(/(?:\d*\.\d+|\d+\.?\d*)|[()+\-*/]/g);
  if (!tokens || tokens.join("") !== compact) return null;
  return tokens;
}

export function evaluateExpression(source) {
  const tokens = tokenize(String(source));
  if (!tokens) return NaN;
  let cursor = 0;

  const parseFactor = () => {
    const token = tokens[cursor];
    if (token === "+") { cursor += 1; return parseFactor(); }
    if (token === "-") { cursor += 1; return -parseFactor(); }
    if (token === "(") {
      cursor += 1;
      const value = parseExpression();
      if (tokens[cursor] !== ")") return NaN;
      cursor += 1;
      return value;
    }
    if (token !== undefined && /^\d*\.?\d+$/.test(token)) { cursor += 1; return Number(token); }
    return NaN;
  };

  const parseTerm = () => {
    let value = parseFactor();
    while (tokens[cursor] === "*" || tokens[cursor] === "/") {
      const operator = tokens[cursor++];
      const next = parseFactor();
      value = operator === "*" ? value * next : value / next;
    }
    return value;
  };

  const parseExpression = () => {
    let value = parseTerm();
    while (tokens[cursor] === "+" || tokens[cursor] === "-") {
      const operator = tokens[cursor++];
      const next = parseTerm();
      value = operator === "+" ? value + next : value - next;
    }
    return value;
  };

  const result = parseExpression();
  return cursor === tokens.length && Number.isFinite(result) ? result : NaN;
}

