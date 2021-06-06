import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { firestore } from 'firebase';
import { Issue } from '../model/Issue.model';

@Injectable({
    providedIn: 'root'
})

export class IssueService {
    private dbPath = '/incidencias';

    issuesRef: AngularFireList<Issue> = null;

    constructor(private db: AngularFireDatabase) {
        this.issuesRef = db.list(this.dbPath);
    }

    create(issue: Issue) {
        return this.issuesRef.push(issue);
    }
}