import { Component, Inject, OnInit } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivityListService } from './activity-list.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
})
export class ActivityListComponent implements OnInit {
  columnsList: any[];
  activityList: any[] = [];
  totalRecords = 0;
  moleculeId: number | undefined;
  rowsPerPageOptions = [5, 10, 15];
  rowsPerPage = 5;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ActivityListComponent>,
    public activityListService: ActivityListService
  ) {
    this.columnsList = [
      { mapping_name: 'type', display_name: 'Type' },
      { mapping_name: 'units', display_name: 'Units' },
      { mapping_name: 'value', display_name: 'Value' },
      { mapping_name: 'relation', display_name: 'Relation' },
      { mapping_name: 'target_name', display_name: 'Target Name' },
      { mapping_name: 'target_organism', display_name: 'Target Organism' },
    ];
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.moleculeId = this.data.id;

    if (this.moleculeId) {
      this.activityListService
        .getActivityList(this.moleculeId)
        .subscribe((values) => {
          this.activityList = values.results;
          this.totalRecords = values.count;
        });
    }
  }

  lazyLoadGridData(event: any) {
    let pageNumber = event.pageNumber;
    let rowsPerPage = event.rowsPerPage;

    if (this.moleculeId) {
      {
        this.activityListService
          .getActivityList(this.moleculeId, rowsPerPage, pageNumber)
          .subscribe((values) => {
            this.activityList = values.results;
          });
      }
    }
  }
}