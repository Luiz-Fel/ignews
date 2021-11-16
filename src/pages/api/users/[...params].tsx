import { NextApiRequest, NextApiResponse } from "next";

export default (request : NextApiRequest, response : NextApiResponse) => {

    const users = [
        {
            id : 1,
            name: "Diego"
        },
        {
            id : 2,
            name: "Lara"
        },
        {
            id: 3,
            name: "Juca"
        }
    ]

    return response.json(users)
}