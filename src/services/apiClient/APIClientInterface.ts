export type APIResponse = {
    data: any
}
export default interface IAPIClient {
    get(url: string, headers?: Record<string, string>): Promise<APIResponse>;
    post(url: string, body?: Record<string, any>, headers?: Record<string, string>): Promise<APIResponse>;
}