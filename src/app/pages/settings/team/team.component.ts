import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class SettingsTeamComponent implements OnInit {
  team = [
    {name: 'Wiky P. Edia', email: 'wikypedia@cointelecom.com', pending: true, alert: 10},
    {name: 'Wiky P. Edia', email: 'wikypedia@cointelecom.com', pending: false, alert: 10},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
