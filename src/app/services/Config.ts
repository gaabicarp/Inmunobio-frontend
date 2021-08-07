import { HttpHeaders } from "@angular/common/http"


export const URL = 'http://10.1.74.195:8080/api/v1/'

export const HTTP_OPTIONS = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '', 
      'Accept' : "/*"})
    }