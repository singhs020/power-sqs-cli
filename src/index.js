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
  .action(cmd => {
    if(!cmd.source) {
      return console.log(chalk.red("The source SQS is required."));
    }

    if(!cmd.dest) {
      return console.log(chalk.red("The destination SQS is required."));
    }

    const config = {
      "source": {"url": cmd.source, "stopOnEmpty": cmd.stopOnEmpty},
      "destination": {"url": cmd.dest},
      
    };

    initSinkToSQS(config);
  });


  program
  .parse(process.argv);