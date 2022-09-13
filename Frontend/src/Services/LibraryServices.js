import LibConfig from "./../Configuration/LibConfig";
import Axios from "./AxiosService";

// const Config = new Configuration();
const axios = new Axios();

export default class CrudServices {

    CreateRecord(data) {
        console.log(data, "****", LibConfig.CreateRecord)
        return axios.post(LibConfig.CreateRecord, data, false)
    }

    ReadRecord() {
        console.log("Using URL:", LibConfig.GetRecord)
        return axios.get(LibConfig.GetRecord, false)
    }

    UpdateRecord(data) {
        console.log("Using URL:", LibConfig.UpdateRecord)
        return axios.put(LibConfig.UpdateRecord, data, false)
    }

    DeleteRecord(data) {
        console.log("Using URL:", LibConfig.DeleteRecord)
        return axios.delete(LibConfig.DeleteRecord, {data:{isbn:data.isbn}}, false)
    }

}
