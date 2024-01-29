import IAPIClient from "./APIClientInterface";
import AxiosAPIClient from "./axiosAPIClient";

export default function getAPIClient(baseUrl: string): IAPIClient {
    return new AxiosAPIClient(baseUrl);
}
