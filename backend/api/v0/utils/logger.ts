interface Message {
    component: any;
    message: String;
}

interface Error {
    component: any;
    message: String;
    error: any;
}

export const info = (process.env.logging === 'false')
    ? (logObject: Message) => { }
    : (logObject: Message) => {
        if (process.env.logging === 'false') { return true; }
        console.info(`[INFO]  ${logObject.component} ==> ${logObject.message}`);
    }

export const warning = (process.env.logging === 'false')
    ? (logObject: Message) => { }
    : (logObject: Message) => {
        if (process.env.logging === 'false') { return true; }
        console.warn(`[WARNING]  ${logObject.component} ==> ${logObject.message}`);
    }

export const error = (process.env.logging === 'false')
    ? (logObject: Error) => { }
    : (logObject: Error) => {
        if (process.env.logging === 'false') { return true; }
        console.trace(`[ERROR]  ${logObject.component} ==> ${logObject.message}: ${logObject.error}`);
    }
