const { htm } = require("@zeit/integration-utils");

const { Nav } = require("../views");

module.exports = Component => props => {
  return htm`
  ${Nav}
  ${Component(props)}
  `;
};
