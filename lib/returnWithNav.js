const { htm } = require("@zeit/integration-utils");

const { Nav } = require("../views");

module.exports = component => () => {
  return htm`
        <Page>
            ${Nav + component}
        </Page>
    `;
};
