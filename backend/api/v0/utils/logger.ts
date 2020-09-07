interface Message {
    component: any;
    message: String;
}

interface Error {
    component: any;
    message: String;
    error: any;
}

export function info(logObject: Message) {
    if (process.env.logging === 'false') { return true; }
    console.info(`[INFO]  ${logObject.component} ==> ${logObject.message}`);
}

export function warning(logObject: Message) {
    if (process.env.logging === 'false') { return true; }
    console.warn(`[WARNING]  ${logObject.component} ==> ${logObject.message}`);
}

export function error(logObject: Error) {
    if (process.env.logging === 'false') { return true; }
    console.trace(`[ERROR]  ${logObject.component} ==> ${logObject.message}: ${logObject.error}`);
}

