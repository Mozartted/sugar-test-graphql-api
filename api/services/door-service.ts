import Axios, {AxiosInstance} from "axios"

const ACME_API = process.env.ACME_API
const ACME_TOKEN = process.env.ACME_TOKEN

console.log(ACME_TOKEN, ACME_API)


export class AcmeService {
    private axios: AxiosInstance;

    constructor(){
        this.axios = Axios.create({
            baseURL: ACME_API,
            headers: {
                "Authorization": `Bearer ${ACME_TOKEN}`
            }
        })
    }
    
    public async getDeviceInfo (deviceID: string) {
        try {
            let response = await this.axios.get(`devices/${deviceID}`)
            if(response){
                return response.data
            }
        } catch (error) {
            throw error
        }
    }

    public async lockDevice (deviceID: string) {
        try {
            let response = await this.axios.get(`devices/${deviceID}/lock`)
            if(response){
                return response
            }
        } catch (error) {
            throw error
        }
    }

    public async unlockDevice (deviceID: string) {
        try {
            let response = await this.axios.get(`devices/${deviceID}/unlock`)
            if(response){
                return response
            }
        } catch (error) {
            throw error
        }
    }
}