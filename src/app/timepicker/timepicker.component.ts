import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {

  private timePickerValInternal = '12:16';
  private timeRegex = /[0-2][0-9]:[0-5][0-9]/;

  public isValid = true;
  public time;

  public get timePickerVal() {
    return this.timePickerValInternal;
  }

  public set timePickerVal(val: string) {
    this.timePickerValInternal = val;
    this.time = this.convertToDate(val);
    if (this.time == null) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
    console.log(`converted: ${JSON.stringify(this.time)}`);
  }

  constructor() { }

  ngOnInit(): void {
  }

  public valueChanged(event: InputEvent) {
    console.log(event);
    const target = event.target as HTMLInputElement;
    this.timePickerVal = target.value;
  }

  private convertToDate(input: string) {
    if (!this.timeRegex.exec(input)) {
      return null;
    }
    const hourString = input.substring(0, 2);
    const minuteString = input.substring(3, 5);
    const hours = Number.parseInt(hourString, 10);
    const minutes = Number.parseInt(minuteString, 10);

    if (minutes >= 60) {
      return null;
    }

    if (hours >= 24) {
      return null;
    }

    return {
      hour: hours,
      minute: minutes,
    };
  }

}
