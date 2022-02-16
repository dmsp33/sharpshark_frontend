import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any;

@Component({
  selector: 'app-modal-safe-list',
  templateUrl: './safe-list.component.html',
  styleUrls: ['./safe-list.component.scss']
})
export class ModalSafeListComponent implements OnInit {

  @Input() idDocument: any;
  @BlockUI() blockUI!: NgBlockUI;

  form: FormGroup = new FormGroup({ });

  defaultEmail: string = 'default.org'; //solo por prueba
  url1 = {show:true};
  url2 = {show:true , url: ''};
  url3 = {show:true , url: ''};
  uuid = '';

  arrayItems!: {
    id: number;
    title: string;
  }[];

  item:boolean = false;

  constructor(
    // private apiService: ApiService, 
    // private _http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {

    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.form = fb.group({
      url: ['', [Validators.required, Validators.pattern(reg)]],
      url2: ['', [Validators.pattern(reg)]],
      url3: ['', [Validators.pattern(reg)]],
    })
    
  }
  ngOnInit() {
    this.arrayItems = [];
    // let usrid = { "handler": `/core/lSafewebsite/${sessionStorage.getItem('usrId')}`, };

     this.route.params.subscribe((params) => { 
       this.uuid = params["uuid"]; 
     });
  }

  showModal(): void {
    $("#modalSF").modal('show');
  }

  hideModal(): void {
    $("#modalSF").modal('hide');
  }



  Save(){    
  }

  get f(){
    return this.form.controls;
  }
   
  submit(){
    console.log(this.form.value);
  }
}
