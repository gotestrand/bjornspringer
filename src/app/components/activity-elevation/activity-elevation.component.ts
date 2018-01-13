import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../models/strava/activity';
import { AtheleteRepository } from '../../repositories/athelete-repository.service';

@Component({
  selector: 'app-activity-elevation',
  templateUrl: './activity-elevation.component.html',
  styleUrls: ['./activity-elevation.component.scss']
})
export class ActivityElevationComponent implements OnInit {

  private _activity: Activity;

  get activity(): Activity {
    return this._activity;
  }

  @Input() set activity(activity: Activity) {
    console.log(activity);
    this._activity = activity;
    this.renderGraph();
  }
  

  constructor(private _athleteRepository: AtheleteRepository) { 

  }

  ngOnInit() {
    
  }

  private renderGraph() {
    this._athleteRepository.getStream(this.activity.id,'altitude').subscribe((elevationData) => {
        

      let _lineChartData: Array<any> = [{
        data: elevationData[1].data,
        label: 'Höjdprofil'
      }];

      this.lineChartData = _lineChartData;
      this.lineChartLabels = elevationData[0].data;

      console.log(this.lineChartData);

    });
  }

  public lineChartData:Array<any> = [{
    data: new Array(100),
    label: 'foo'
  }];

  public lineChartLabels:Array<any> = new Array(100);
  // public lineChartData:Array<any> = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
  //   {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  // ];
  // public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
