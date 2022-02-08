const {Command} = require("commander");
const chalk = require("chalk");
const {initSinkToSQS} = require("power-sqs");
const {version, description} = require("../package.json");

const program = new Command();

program
  .version(version)
  .description(description)
  .command("sinktosqs")
  .option("-s, --source <sourceSQS>", "The url for the source SQS")
  .option("-d, --dest <dq>", "The url for the destination SQS")
  .option("--stopOnEmpty", "Stop the polling if the SQS returns nop messages")
  .option("--oneByOne", "Process the messages one by one in reading")
  .action(({source, dest, stopOnEmpty, oneByOne}) => {
    if(!source) {
      return console.log(chalk.red("The source SQS is required."));
    }

    if(!dest) {
      return console.log(chalk.red("The destination SQS is required."));
    }

    const config = {
      "source": {"url": cmd.source, "stopOnEmpty": stopOnEmpty, "isBulkOps": !oneByOne},
      "destination": {"url": cmd.dest},
    };

    initSinkToSQS(config);
  });


  program
  .parse(process.argv);