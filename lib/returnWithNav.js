const { Nav } = require("../views");

module.exports = Component => props => {
  return `
        <Page>
            ${Nav}
            ${Component(...props)}
        </Page>
    `;
};
