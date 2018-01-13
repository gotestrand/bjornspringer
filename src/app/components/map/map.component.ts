import { Component, OnInit } from '@angular/core';

import { MapStateService } from '../../services/map-state.service';

import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  

  constructor(private _mapService: MapService) { }

  ngOnInit() {

    this._mapService.init();

  }

}


