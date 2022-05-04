import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SupportSiteAngular';
  siteIDToggle = false;
  GUIDToggle = false;
  siteIDErrorToggle = false;
  GUIDErrorToggle = false;
  convertedSiteIDData : string = "";
  convertedGUIDData: string = "";
  submitBool = 0;
  SiteID = "";
  GUID = "";
  GUIDErrorString = "Error, Invalid GUID.";
  siteIDErrorString = "Error, Invalid Site ID.";
  siteIDURLBase = 'http://localhost:5000/api/SensorReadings/GetSensorZoneReadingsForSiteId'
  siteIDURLBase2 = 'http://10.0.0.29:80/api/SensorReadings/GetSensorZoneReadingsForSiteId'
  guIDURLBase = 'http://localhost:5000/api/SensorReadings/GetSensorZoneReadingsForSiteGuid'
  guIDURLBase2 = 'http://10.0.0.29:80/api/SensorReadings/GetSensorZoneReadingsForSiteGuid'
  
  constructor(private http: HttpClient){}

  public getSiteIDJSON(ID: string): Observable<any> {
    return this.http.get(this.siteIDURLBase2, {responseType: 'text'});
  }
  public getGUIDJSON(ID : string) : Observable<any> {
    return this.http.get(this.guIDURLBase2,{responseType: 'text'});
  }
  
  getSiteID(){
    this.hideAllErrors() 
    this.siteIDValidation()
    if (this.submitBool == 0){
      this.siteIDError()
    }
    else{ 
      this.getSiteIDJSON(this.SiteID).subscribe(data => {
        console.log("Got ID data");
        this.convertedSiteIDData = this.convertData(data);
        this.GUIDToggle = false;
        this.siteIDToggle = true;	
      });
    }
  }

  
  getGUID(){
    this.hideAllErrors() 
    this.GUIDValidation()
    if (this.submitBool == 0){
      this.GUIDError()
    }
    else{
      this.getGUIDJSON(this.GUID).subscribe(data => {
        console.log("Got GUID data");
        this.convertedGUIDData = this.convertData(data);
        this.GUIDToggle = true;
        this.siteIDToggle = false;
      });
    }
  }
  
  convertData(data : string){
    data = data.replace('"response":', '');
    data = data.replace('"{"statusCode":200', '');
    data = data.replace(',"body":"{', '');
    data = data.replace(/\\/g, '');
    data = data.replace('"message":"Success"', '{"message": "Success"');
    data = data.replace(/"""/g, '"}}]}')
    data = JSON.stringify(JSON.parse(data), null, 2);
    return data;
  }
  
  siteIDValidation(){
    console.log("Validating.");
    var userString = this.SiteID;
    var siteIDRegEx = new RegExp('^[0-9a-fA-F]{80}$');
    if (siteIDRegEx.test(userString)){
      console.log("Valid Reg");
      this.submitBool = 1;
    }
    else{
      console.log("Invalid Reg");
      this.submitBool = 0;
    }
  }
  
  GUIDValidation(){
    console.log("Validating.");
    var userString = this.GUID;
    var GUIDRegEx = new RegExp('^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$');
    if (GUIDRegEx.test(userString)){
      console.log("Valid Reg");
      this.submitBool = 1;
    }
    else{
      console.log("Invalid Reg");
      this.submitBool = 0;
    }
  }
  
  GUIDError() {
    this.GUIDToggle = false;
    this.siteIDToggle = false;
    this.GUIDErrorToggle = true;
  }
  
  siteIDError() {
    this.GUIDToggle = false;
    this.siteIDToggle = false;
    this.siteIDErrorToggle = true;
  }
  
  hideAllErrors() {
    this.GUIDToggle = false;
    this.siteIDToggle = false;
    this.siteIDErrorToggle = false;
    this.GUIDErrorToggle = false;
  }
}
