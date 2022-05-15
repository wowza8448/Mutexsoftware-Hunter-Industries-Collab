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
  menuToggle = false;
  convertedSiteIDData : string = "";
  convertedGUIDData : string = "";
  submitBool = 0;
  SiteID = "";
  GUID = "";
  GUIDErrorString = "Error, Invalid GUID.";
  siteIDErrorString = "Error, Invalid Site ID.";
  siteIDURLBase = 'http://localhost:5000/api/SensorReadings/GetSensorZoneReadingsForSiteId'
  siteIDURLBase2 = 'http://192.168.12.164/api/SensorReadings/GetSensorZoneReadingsForSiteId'
  guIDURLBase = 'http://localhost:5000/api/SensorReadings/GetSensorZoneReadingsForSiteGuid'
  guIDURLBase2 = 'http://192.168.12.164/api/SensorReadings/GetSensorZoneReadingsForSiteGuid'
  
  /**
   * constructor for http client
   * @param http 
   */
  constructor(private http: HttpClient){}

  /**
   * Sends a GET request to the URL contained in siteIDURLBase, with the user input Site ID string appeneded to the url
   * 
   * @param ID 
   * @returns JSON data served at the site ID URL from the Hunter database
   */
  public getSiteIDJSON(ID: string): Observable<any> {
    return this.http.get(this.siteIDURLBase2, {responseType: 'json'});
  }

  /**
   * Sends a GET request to the URL contained in guIDURLBase, with the user input GUID string appeneded to the url
   * @param ID 
   * @returns JSON data served at the GUID URL from the Hunter database
   */
  public getGUIDJSON(ID : string) : Observable<any> {
    return this.http.get(this.guIDURLBase2, {responseType: 'json'});
  }

  /**
   * Clears all input variables, all display output, and all errors currently displayed
   */
  clear() {
    console.log("Cleared page!");
    this.hideAllErrors();
    this.SiteID = ''
    this.GUID = ''
  }

  /**
   * Hides any errors displayed on site in to prepare for new data display,
   * validates user input on the Site ID search string, and on successful Site ID validation,
   * retrieves JSON from search string URL.
   * After data is returned from the URL, the data is converted through JSON layers down to the database data, 
   * and finally displayed onto the webpage using convertedSiteIDData
   */
  getSiteID(){
    this.hideAllErrors() 
    this.siteIDValidation()
    if (this.submitBool == 0){
      this.siteIDError()
    }
    else{ 
      this.getSiteIDJSON(this.SiteID).subscribe(data => {
        if (data.responseType = 'json'){
          this.convertedSiteIDData = this.convertData(data);
          this.GUIDToggle = false;
          this.siteIDToggle = true;	
        }
        else{
          console.log("Error: Wrong data type returned from URL");
        }
      });
    }
  }

  /**
   * Hides any errors displayed on site in to prepare for new data display,
   * validates user input on the GUID search string, and on successful GUID validation,
   * retrieves JSON from search string URL.
   * After data is returned from the URL, the data is converted through JSON layers down to the database data, 
   * and finally displayed onto the webpage using convertedGUIDData
   */
  getGUID(){
    this.hideAllErrors() 
    this.GUIDValidation()
    if (this.submitBool == 0){
      this.GUIDError()
    }
    else{
      this.getGUIDJSON(this.GUID).subscribe(data => {
        if (data.responseType = 'json'){
          this.convertedGUIDData = this.convertData(data);
          this.GUIDToggle = true;
          this.siteIDToggle = false;
        }
        else{
          console.log("Error: Wrong data type returned from URL");
        }
      });
    }
  }
  
  /**
   * Parses nested JSON to retrieve relevant location data
   * @param data retrieved database JSON from search URL
   * @returns stringified base level JSON data
   */
  convertData(data : any){
    var responseJSONValue = data.response;
    var statusBodyJSON = JSON.parse(responseJSONValue);
    var databaseJSON = statusBodyJSON.body;
    var finalData = JSON.parse(databaseJSON);
    return JSON.stringify(finalData, null, 2);
  }
  
  /**
   * Validates the current user Site ID search input value against the standard Site ID format.
   * Sets submission flag to one on a successful format validation, and zero on a failure.
   * Also modifies the error message based on error present in userString.
   */
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
      if (userString.length > 80){
        this.siteIDErrorString = "Site ID too long.";
      }
      else if (userString.length < 80 && userString.length >= 1){
        this.siteIDErrorString = "Site ID too short.";
      }
      else if (userString == ''){
        this.siteIDErrorString = "Please enter a Site ID value.";
      }
      else{
        this.siteIDErrorString = "Non-hex value detected in Site ID.";
      }
    }
  }
  
  /**
   * Validates the current user GUID search input value against the standard GUID format.
   * Sets submission flag to one on a successful format validation, and zero on a failure.
   * Also modifies the error message based on error present in userString.
   */
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
      if (userString.length > 36){
        this.GUIDErrorString = "GUID too long.";
      }
      else if (userString.length < 36 && userString.length >= 1){
        this.GUIDErrorString = "GUID too short.";
      }
      else if (userString == ''){
        this.GUIDErrorString = "Please enter a GUID value.";
      }
      else{
        this.GUIDErrorString = "Non-hex value detected in GUID.";
      }
    }
  }

  /**
   * Displays error box for Site ID input error, clearing any previously displayed output
   */
  siteIDError() {
    this.GUIDToggle = false;
    this.siteIDToggle = false;
    this.siteIDErrorToggle = true;
  }

  /**
   * Displays error box for GUID input error, clearing any previously displayed output
   */
  GUIDError() {
    this.GUIDToggle = false;
    this.siteIDToggle = false;
    this.GUIDErrorToggle = true;
  }
  
  /**
   * Clears all previously displayed output, and any displayed error boxes
   */
  hideAllErrors() {
    this.GUIDToggle = false;
    this.siteIDToggle = false;
    this.siteIDErrorToggle = false;
    this.GUIDErrorToggle = false;
  }
}
