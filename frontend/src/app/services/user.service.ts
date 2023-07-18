import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Todo {
  emp_id: string;
  name: string;
  position: string;
  date: string;
  remarks: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:8080/api/v1/auth";
 // PATH_OF_LOGIN = "http://localhost:8080/api/v1/auth/authenticate";
  PATH_TODO = "http://localhost:8080/api";
  PATH_UPDATE = "http://localhost:8080/api/todo"

  // requestHeader = new HttpHeaders(
  //   {"No-Auth": "True"}
  //  );

  constructor(private httpclient: HttpClient) { }

  public register(registerData: any) {
    return this.httpclient.post<any>(this.PATH_OF_API + "/register", registerData);
  }

  public login(loginData: any) {
    return this.httpclient.post<any>(this.PATH_OF_API + "/authenticate", loginData);
  }

  public getTodos(jwtToken: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
   // console.log(headers)
    return this.httpclient.get<Todo[]>(this.PATH_TODO, { headers: headers });
  }

  public add(addData: any,jwtToken:string) {
  //   return this.httpclient.post<any>(this.PATH_TODO, addData, {headers: this.requestHeader});
  //
  const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
  return this.httpclient.post<any>(this.PATH_TODO, addData, {headers});
  
}

  public update(updateData: any ,jwtToken:string) {
    const emp_id = updateData.emp_id;
    const url = `${this.PATH_UPDATE}/${emp_id}`;
    console.log(url);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.httpclient.put<any>(url, updateData, { headers});
  }

  public delete(deleteData: any, jwtToken:string) {
    const emp_id = deleteData.emp_id;
    const url = `${this.PATH_UPDATE}/${emp_id}`;
    console.log(url);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
  
    return this.httpclient.delete<any>(url,{ headers });
  }

}
