import axios from "axios";
import { toAPIURL } from "../utils/api";

export default async function getAllQuestions() {
    const res = await axios.get(toAPIURL('api/questions-list'));
    if(res.status !== 200)
        throw new Error('Cannot fetch data!')

    return res.data
};