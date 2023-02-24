import axios from "axios";
import {IUploadResult} from "../types/types";

//const baseUrl = "https://chat-app-server.azurewebsites.net/";
const baseUrl = "http://localhost:5113/";


export async function uploadImg(image: File):Promise<IUploadResult> {
    let data = new FormData();
    data.append('image', image);

    const url = `${baseUrl}img/uploadImage`;

    const result = await axios.post(url, data).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });

    return result;
}
