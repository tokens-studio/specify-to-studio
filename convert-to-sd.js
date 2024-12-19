import { createSpecifyClient, parsers } from "@specifyapp/sdk";
import { convertToDTCG } from "style-dictionary/utils";
import fs from "node:fs/promises";

const tokenTree = JSON.parse(await fs.readFile("specify-tokens.json", "utf-8"));

const specifyClient = createSpecifyClient();

const sdtfClient = specifyClient.loadSDTFClient(tokenTree);

const executePipelines = sdtfClient.createParsersPipelines(
  parsers.toStyleDictionary({
    output: { type: "directory", directoryPath: "tokens" },
  })
);

const results = await executePipelines();

// log some information about the SDK run
results.debug();

// convert results files to DTCG format
results.mapFiles((file) => {
  return {
    ...file,
    content: {
      ...file.content,
      text: JSON.stringify(
        convertToDTCG(
          JSON.parse(
            /** @type {{type: 'text'; text: string}} */ (file.content).text
          )
          // Turns off putting $type to the highest common ancestor group
          // { applyTypesToGroup: false }
        ),
        null,
        "\t"
      ),
    },
  };
});
await results.writeToDisk();
