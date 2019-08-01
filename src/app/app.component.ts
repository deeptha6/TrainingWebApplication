import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './_modal';
import { APIService } from './apiservice.service';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


export class TrainingDetail {
    constructor(
        public TrainingName: string,
        public TrainingStartDate: NgbDateStruct,
        public TrainingEndDate: NgbDateStruct) {
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],

})

export class AppComponent implements OnInit {
    @Output() TrainingEvent = new EventEmitter<TrainingDetail>();
    trainingForm: FormGroup;
    submitted = false;
    popupmessage = '';
    constructor(private formBuilder: FormBuilder,
        private modalService: ModalService,
        private apiService: APIService,
        private ngbDateParser: NgbDateParserFormatter) { }

    ngOnInit() {
        this.trainingForm = this.formBuilder.group({
            TName: ['', Validators.required],
            TStart: ['', Validators.required],
            TEnd: ['', Validators.required]
        }, {
                validator: this.ValidateDates("TStart", "TEnd")
            });
    }

    get f() {
        return this.trainingForm.controls;
    }

    ValidateDates(startDateControlName: string, endDateControlName: string) {
        return (formGroup: FormGroup) => {
            const startDateControl = formGroup.controls[startDateControlName];
            const endDateControl = formGroup.controls[endDateControlName];

            if (endDateControl.errors && !endDateControl.errors.ValidateDates) {
                return;
            }

            let sDate = new Date(startDateControl.value.year, startDateControl.value.month - 1, startDateControl.value.day)
            let eDate = new Date(endDateControl.value.year, endDateControl.value.month - 1, endDateControl.value.day)


            if (eDate < sDate) {
                endDateControl.setErrors({
                    ValidateDates: true
                });
            } else {
                endDateControl.setErrors(null);
            }
        }
    }

    calculateDate(date1, date2) {
        let diffc = date1.getTime() - date2.getTime();
        let days = Math.round(Math.abs(diffc / (1000 * 60 * 60 * 24)));
        return days;
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }


    SaveTrainingInfo() {
        this.submitted = true;

        if (this.trainingForm.invalid) {
            return;
        }

        var trainingNameControl = this.f.TName.value;
        var startDateControl = this.f.TStart.value;
        var endDateControl = this.f.TEnd.value;

        let sDate = new Date(startDateControl.year, startDateControl.month - 1, startDateControl.day)
        let eDate = new Date(endDateControl.year, endDateControl.month - 1, endDateControl.day)

        this.TrainingEvent.emit(
            new TrainingDetail(
                trainingNameControl,
                startDateControl,
                endDateControl
            )
        );
        var trainingData = {};
        trainingData["TrainingName"] = trainingNameControl;
        trainingData["StartDate"] = sDate;
        trainingData["EndDate"] = eDate;

        this.apiService.saveTrainingInfo(JSON.stringify(trainingData)).subscribe((response) => {
            console.log(response);

            this.popupmessage = "Successfully submitted training data and two dates diff is :" + this.calculateDate(eDate, sDate)
            //  this.modalService.open("custom-modal-2");
            this.onReset();
        },
            error => {
                this.TrainingEvent.emit(new TrainingDetail(null, null, null));
                this.popupmessage = "Sorry!! Something wen wrong, Please try again";
                this.onReset();
                //	this.modalService.open("custom-modal-2");
            });

    }

    onReset() {
        this.submitted = false;
        this.trainingForm.reset();
    }
}