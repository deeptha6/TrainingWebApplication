import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent, TrainingDetail } from './app.component';
import { NgbModule, NgbDatepickerModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalComponent } from './_modal/modal.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let modalService: NgbModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ModalComponent],
      imports: [NgbModule, NgbDatepickerModule, FormsModule, ReactiveFormsModule, HttpClientModule],
      providers: [NgbActiveModal, HttpClientModule, HttpClient]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ModalComponent]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);

    component = fixture.componentInstance;
    component.ngOnInit(); (2)

  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome!!!');
  }));

  it('form invalid when empty', () => {
    expect(component.trainingForm.valid).toBeFalsy();
  });


  it('training name field validity', () => {
    let TName = component.trainingForm.controls['TName'];
    expect(TName.valid).toBeFalsy();

    let errors = {};
    errors = TName.errors || {};
    expect(errors['required']).toBeTruthy();

  });

  it('training startDate field validity', () => {
    let TStart = component.trainingForm.controls['TStart'];
    expect(TStart.valid).toBeFalsy();

    let errors = {};
    errors = TStart.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('training EndDate field validity', () => {
    let TEnd = component.trainingForm.controls['TEnd'];
    expect(TEnd.valid).toBeFalsy();

    let errors = {};
    errors = TEnd.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('submitting a training form ', () => {
    expect(component.trainingForm.valid).toBeFalsy();
    component.trainingForm.controls['TName'].setValue("Java");

    component.trainingForm.controls['TStart'].setValue({
      year: 2019,
      month: 7,
      day: 7
    });

    component.trainingForm.controls['TEnd'].setValue({
      year: 2019,
      month: 7,
      day: 17
    });

    expect(component.trainingForm.valid).toBeTruthy();

    let tDetail: TrainingDetail;
    component.TrainingEvent.subscribe((value) => tDetail = value);


    component.SaveTrainingInfo();
    modalService = TestBed.get(NgbModal),
      modalService.open(ModalComponent);
    expect(tDetail.TrainingName).toBe("Java");

    var sdate = new Date("2019-7-7");
    var sngbDateStruct = { day: sdate.getDate(), month: sdate.getMonth() + 1, year: sdate.getFullYear() };
    expect(tDetail.TrainingStartDate).toEqual(sngbDateStruct);

    var edate = new Date("2019-7-17");
    var engbDateStruct = { day: edate.getDate(), month: edate.getMonth() + 1, year: edate.getFullYear() };
    expect(tDetail.TrainingEndDate).toEqual(engbDateStruct);

  });

});