
import axios from "axios";
import IAPIClient, { APIResponse } from "./APIClientInterface";

export default class AxiosAPIClient implements IAPIClient {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async get(path: string, headers?: Record<string, string>): Promise<APIResponse> {
        const url = new URL(path, this.baseUrl)
        const res = await axios.get(url.toString(), { headers })
        return {
            data: res.data
        }
    }
    async post(path: string, body?: Record<string, any>, headers?: Record<string, string>): Promise<APIResponse> {
        const url = new URL(path, this.baseUrl)
        const res = await axios.post(url.toString(), body, { headers })

        return {
            data: res.data
        }
    }

}