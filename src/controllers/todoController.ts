
import { Request, Response } from "express";
import IAPIClient from "../services/apiClient/APIClientInterface";
import { StatusCodes } from "http-status-codes";

export default class TodoController {
    apiClient: IAPIClient

    constructor(apiClient: IAPIClient) {
        this.apiClient = apiClient
    }

    setAPIClient(apiClient: IAPIClient) {
        this.apiClient = apiClient
    }

    async get(req: Request, res: Response) {

        const apiResponse = await this.apiClient.get("/posts")

        res.json({
            todos: apiResponse.data
        })

    }

    async create(req: Request, res: Response) {
        const body = req.body

        const apiResponse = await this.apiClient.post("/posts", body, {
            'Content-type': 'application/json; charset=UTF-8',
        })

        res.status(StatusCodes.CREATED).json(apiResponse.data)
    }
}