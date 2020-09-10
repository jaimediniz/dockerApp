interface Message {
  component: any;
  message: String;
}

interface Error {
  component: any;
  message: String;
  error: any;
}

export const component =
  process.env.logging === "false"
    ? (component: String) => {
        return component;
      }
    : (component: String) => {
        console.info(`[COMPONENT] ${component}`);
        return component;
      };

export const info =
  process.env.logging === "false"
    ? (logObject: Message) => {}
    : (logObject: Message) => {
        console.info(`[INFO]  ${logObject.component} ==> ${logObject.message}`);
      };

export const warning =
  process.env.logging === "false"
    ? (logObject: Message) => {}
    : (logObject: Message) => {
        console.warn(
          `[WARNING]  ${logObject.component} ==> ${logObject.message}`
        );
      };

export const error =
  process.env.logging === "false"
    ? (logObject: Error) => {}
    : (logObject: Error) => {
        console.trace(
          `[ERROR]  ${logObject.component} ==> ${logObject.message}: ${logObject.error}`
        );
      };
