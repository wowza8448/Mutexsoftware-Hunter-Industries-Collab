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

  it(`should have as title 'SupportSiteAngular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('SupportSiteAngular');
  });

  it('should disable display', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.hideAllErrors();
    expect(app.siteIDErrorToggle && app.GUIDErrorToggle).toEqual(false);
  });

  it('should display errors on incorrect site ID', () => {      
    const fixture = TestBed.createComponent(AppComponent);    
    const app = fixture.componentInstance;     
    app.SiteID = "Incorrect String";     
    app.getSiteID();     
    expect(app.siteIDErrorToggle).toEqual(true);   
  });

  it(`should display errors on incorrecct GUID`, () => {
    const fixture = TestBed.createComponent(AppComponent);    
    const app = fixture.componentInstance;
    app.GUID = `Incorrect String`
    app.getGUID()
    expect(app.GUIDErrorToggle).toEqual(true);
  });

  it(`should set submitBool to 1 when GUID entry is the correct length`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.GUID = "195350b6-2422-4290-8fe7-f56890fe5b53";
    app.GUIDValidation();
    expect(app.submitBool).toBe(1);
  });
  
  it(`should set submitBool to 0 when GUID entry is too short`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.GUID = "195350b6-2422-4290-8fe7-f6890fe5b5";
    app.GUIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should set submitBool to 0 when GUID entry is too long`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.GUID = "195350b6-2422-4290-81fe7-f56890fe5b53a23";
    app.GUIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should set submitBool to 0 when GUID entry is missing hyphens`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.GUID = "195350b6242242908fe7f56890fe5b51";
    app.GUIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should set submitBool to 0 when GUID entry contains invalid characters`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.GUID = "19535ab6-2422-4290-8fe7-f5689@fe5b53";
    app.GUIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should set submitBool to 0 when GUID entry is empty`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.GUID = "";
    app.GUIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should set submitBool to 1 when siteID is the correct length`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.SiteID = "a8c4d5f97ca0f493f79adbac669dad5c3a54d89f8b04794a609d853f177ec850fdf7e6121bbbee34";
    app.siteIDValidation();
    expect(app.submitBool).toBe(1);
  });

  it(`should set submitBool to 0 when siteID is too short`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.SiteID = "a8c4d5f97ca0f493f79adbac669dada54d898b04794a609d853f177ec850fdf7e6121bbbee34";
    app.siteIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should set submitBool to 0 when siteID is too long`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.SiteID = "a8c4d5f97ca0f493f79adbac669dad5c3a54d89a3f8b04794a609d853f177ec850fdf7e6121bbbee34";
    app.siteIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should set submitBool to 0 when siteID contains invalid characters`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.SiteID = "a8c4d5f97ca0f493f79adbac669dad@c3a54d89f8b-4794a609$853f177ec850fdf7e6121bbbee34";
    app.siteIDValidation();
    expect(app.submitBool).toBe(0);
  });

  it(`should set submitBool to 0 when siteID is empty`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.SiteID = "";
    app.siteIDValidation();
    expect(app.submitBool).toBe(0);
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('SupportSiteAngular app is running!');
  // });
});
