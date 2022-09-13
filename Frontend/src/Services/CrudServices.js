import Configuration from "./../Configuration/Configuration"
import Axios from "./AxiosService";

// const Config = new Configuration();
const axios = new Axios();

export default class CrudServices {

    CreateRecord(data) {
        console.log(data, "****", Configuration.CreateRecord)
        return axios.post(Configuration.CreateRecord, data, false)
    }

    ReadRecord() {
        console.log("Using URL:", Configuration.GetRecord)
        return axios.get(Configuration.GetRecord, false)
    }

    UpdateRecord(data) {
        console.log("Using URL:", Configuration.UpdateRecord)
        return axios.put(Configuration.UpdateRecord, data, false)
    }

    DeleteRecord(data) {
        console.log("Using URL:", Configuration.DeleteRecord)
        return axios.delete(Configuration.DeleteRecord, {data:{id:data.id}}, false)
    }

}
