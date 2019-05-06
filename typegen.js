const fs = require('fs');
const path = require('path');
const generateTypesForDocument = require('openapi-client-axios/typegen').generateTypesForDocument;

const rootDir = process.env.NODE_PATH || process.cwd();
const defaultTypesFile = path.join(rootDir, "globals.d.ts");

function typegen({
  spec,
  alias="$hm",
  typesFile=defaultTypesFile,
} = {}) {
  generateTypesForDocument(spec).then(
    ([imports, schemaTypes, operationTypings]) => {
      const data = `
// GENERATED BY WEBPACK HAKUNA MATATA
${imports}
${schemaTypes}
${operationTypings}
declare const ${alias}: OpenAPIClient<OperationMethods>
      `;

      fs.writeFile(typesFile, data, console.log);
    });
}

module.exports = typegen;