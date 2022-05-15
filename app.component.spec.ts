import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /**
   * 
   * hideAllErrors() functionality test
   */
  it('should disable info and error display on hideAllErrors function call', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.hideAllErrors();
    expect(app.siteIDErrorToggle && app.GUIDErrorToggle).toEqual(false);
  });

  /**
   * 
   * siteIDError() functionality test
   */
  it('should display errors on incorrect site ID', () => {      
    const fixture = TestBed.createComponent(AppComponent);    
    const app = fixture.componentInstance;     
    app.SiteID = "Incorrect String";     
    app.getSiteID();     
    expect(app.siteIDErrorToggle).toEqual(true);   
  });

  /**
   * 
   * GUIDError() functionality test
   */
  it(`should display errors on incorrect GUID`, () => {
    const fixture = TestBed.createComponent(AppComponent);    
    const app = fixture.componentInstance;
    app.GUID = `Incorrect String`
    app.getGUID()
    expect(app.GUIDErrorToggle).toEqual(true);
  });

  /**
   * 
   * GUID input validation testing
   */
  it(`should pass GUID validation when GUID entry is the correct length`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.GUID = "195350b6-2422-4290-8fe7-f56890fe5b53";
    app.GUIDValidation();
    expect(app.submitBool).toBe(1);
  });
  
  it(`should fail GUID validation when GUID entry is too short`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.GUID = "195350b6-2422-4290-8fe7-f6890fe5b5";
    app.GUIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should fail GUID validation when GUID entry is too long`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.GUID = "195350b6-2422-4290-81fe7-f56890fe5b53a23";
    app.GUIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should fail GUID validation when GUID entry is missing hyphens`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.GUID = "195350b6242242908fe7f56890fe5b51";
    app.GUIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should fail GUID validation when GUID entry contains invalid characters`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.GUID = "19535ab6-2422-4290-8fe7-f5689@fe5b53";
    app.GUIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should fail GUID validation when GUID entry is empty`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.GUID = "";
    app.GUIDValidation();
    expect(app.submitBool).toBe(0);
  });

  /**
   * 
   * Site ID input validation testing
   */
  it(`should pass Site ID validation when siteID is the correct length`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.SiteID = "a8c4d5f97ca0f493f79adbac669dad5c3a54d89f8b04794a609d853f177ec850fdf7e6121bbbee34";
    app.siteIDValidation();
    expect(app.submitBool).toBe(1);
  });

  it(`should fail Site ID validation when siteID is too short`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.SiteID = "a8c4d5f97ca0f493f79adbac669dada54d898b04794a609d853f177ec850fdf7e6121bbbee34";
    app.siteIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should fail Site ID validation when siteID is too long`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.SiteID = "a8c4d5f97ca0f493f79adbac669dad5c3a54d89a3f8b04794a609d853f177ec850fdf7e6121bbbee34";
    app.siteIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should fail Site ID validation when siteID contains invalid characters`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.SiteID = "a8c4d5f97ca0f493f79adbac669dad@c3a54d89f8b-4794a609$853f177ec850fdf7e6121bbbee34";
    app.siteIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should fail Site ID validation when siteID is empty`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.SiteID = "";
    app.siteIDValidation();
    expect(app.submitBool).toBe(0);
  });

  /**
  * Test of the convertData function, that converts the triple-stringified 
  * database JSON into a displayable string.
  * 
  * Only the body key in nest one and the response key in nest two are required to simulate the database return.
  */
  it(`should translate nested stringified JSON into raw database data for display`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    var resultString = "";
  
    var JSONString : string = "\{\"Testing1\" : \"Test1\",\"Testing2\" : \"Test2\",\"Testing3\" : \"Test3\",\"Testing4\" : \"Test4\",\"Testing5\" : \"Test5\"}"
    var JSONData  = JSON.parse(JSONString);
    JSONData = JSON.stringify(JSON.stringify(JSONData));
      
    var nest1 = "\{\"body\" : " + JSONData + "}"
    var nest1Data = JSON.parse(nest1);
    nest1Data = JSON.stringify(JSON.stringify(nest1Data));
      
    var nest2 = "\{\"response\" : " + nest1Data + "}"
    var nest2Data = JSON.parse(nest2);
      
    resultString = app.convertData(nest2Data)
      
    var stringCompare = resultString === ""
    expect(stringCompare).toBeFalse();
  });
});
