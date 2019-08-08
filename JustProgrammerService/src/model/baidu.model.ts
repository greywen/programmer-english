export interface IBaiduAuthModel extends IBaiduApiErrorModel {
    access_token: string,
    session_key: string,
    scope: string,
    refresh_token: string,
    session_secret: string,
    expires_in: number
}


interface IBaiduApiErrorModel {
    error_code: string,
    error_msg: string,
    error: string,
    error_description: string
}