import { Component, OnInit } from '@angular/core';
import { StorageService } from '../core/storage.service';
import { User } from '../models/user.dto';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: User;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.storage.getUser().then(x => this.user = x);
  }

}
