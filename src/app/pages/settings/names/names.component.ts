import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class SettingsNamesComponent implements OnInit {
  names = [
    {default:true, show:true , name:'Wiky P. Edia'},
    {default:false, show:true , name:'TestingPro'},
    {default:false, show:true , name:'Sharking'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
