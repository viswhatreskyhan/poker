const fs = require("fs");

const validateNumber = (value) => {
  return value
    .replace(/[^\d.]*/g, "")
    .replace(/([.])[.]+/g, "$1")
    .replace(/^[^\d]*(\d+([.]\d{0,5})?).*$/g, "$1");
};

function renderRule(rule) {
  const { type, values, offpeak, network, level: ruleLevel, KO, status, color } = rule;
  const config = JSON.parse(fs.readFileSync("src/store/rules/config.json", "utf-8"));

  const indexPrizepool = config[type].findIndex((rule) => rule.placeholder === "Guarantee");

  values[indexPrizepool] = offpeak
    ? `isOffpeak && isGetTournaments ? 0 : ${values[indexPrizepool]}`
    : values[indexPrizepool];

  const level = validateNumber(ruleLevel);
  const effMu = ruleLevel.replace(level, "").replace("-", "");

  return (
    `(${type}(${values
      .map((value, i) =>
        config[type][i].type === "string" && indexPrizepool !== i
          ? `"${value}"`
          : indexPrizepool !== i
          ? Number(value)
          : value,
      )
      .join(",")}))
    && network === '${network}'` +
    (level === "1" && ruleLevel.includes("-") ? "" : `&& level === '${level}'`) +
    (effMu !== "all" ? `&& effmu === '${effMu}'` : "") +
    (status !== "all" ? `&& is${status}` : "") +
    (KO !== "all" ? `&& ${KO === "KO" ? "isKo" : "!isKo"}` : "") +
    (color === "green" || color === "brown" ? `&& isGetTournaments` : "")
  );
}

module.exports = { renderRule };
