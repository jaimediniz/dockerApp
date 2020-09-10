import * as log from '../utils/logger';

const section = 'Controllers | Settings |'

interface ReturnJson {
    msg: String;
    error: boolean;
    data: any;
}

export async function getSettings(req: any, res: any) {
    const component = log.component(`${section} getSettings`)
    try {
        if (false) {
            const returnJson: ReturnJson = {
                msg: 'Not found',
                error: true,
                data: {}
            };
            return res.status(401).json(returnJson);
        }
        const returnJson: ReturnJson = {
            msg: '',
            error: false,
            data: {}
        };
        return res.status(200).json(returnJson);
    } catch (error) {
        log.error({ component, message: 'Error', error });
        const returnJson: ReturnJson = {
            msg: '',
            error: true,
            data: {}
        };
        return res.status(500).json(returnJson);
    }
}