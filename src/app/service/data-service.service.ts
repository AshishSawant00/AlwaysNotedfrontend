import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notes } from '../model/Notes';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private userUrl: string;

  private nameSource = new BehaviorSubject<string>('');
  currentName = this.nameSource.asObservable();

  changeName(name: string) {
    this.nameSource.next(name);
  }

  private uuid = new BehaviorSubject<string>('');
  currentUuid = this.uuid.asObservable();

  setUuid(uuid: string) {
    this.uuid.next(uuid);
  }

  private id = new BehaviorSubject<number>(0);
  currentId = this.id.asObservable();

  setId(id: number) {
    this.id.next(id);
  }


  private noteId = new BehaviorSubject<number>(0);
  currentNoteId = this.noteId.asObservable();

  setNoteId(id: number) {
    this.noteId.next(id);
  }




  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/always-noted'
  }

  saveNotesAsPdf(notes: Notes[]): Observable<Blob> {

    return this.http.post(this.userUrl + "/api/notes/pdf", notes, {

      responseType: 'blob',

    });

  }

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password,
    };
    console.log("Inside login" + loginData.username + "   " + loginData.password);


    return this.http.post(`${this.userUrl}/login`, loginData);
  }

  signup(name: string, userName: string, email: string, password: string): Observable<any> {
    // Define the request body
    const signupData = {
      name: name,
      userName: userName,
      email: email,
      password: password,
    };
    // Define HTTP headers (if needed)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.userUrl}/signup`, signupData, { headers: headers });
  }

  viewNotes(id: number): Observable<any> {

    console.log("View Notes UUID : " + id);


    return this.http.get(`${this.userUrl}/` + id);
  }

  saveNote(note: Notes): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.userUrl}/save-note`, note, { responseType: 'text' });
  }


  updateNote(note: Notes): Observable<any> {
    console.log("Inside update note  " + note.noteId);

    return this.http.put(`${this.userUrl}/note/` + note.noteId, note)
  }

  deleteNote(noteId: number): Observable<any> {
    return this.http.delete(`${this.userUrl}/note/` + noteId, { responseType: 'text' });
  }

  public home(): Observable<any[]> {
    return this.http.get<any[]>(`${this.userUrl}`);
  }


  private actualLogInClicked = new BehaviorSubject<boolean>(false);
  actualLogInClicked$ = this.actualLogInClicked.asObservable();

  private signUpClicked = new BehaviorSubject<boolean>(false);
  signUpClicked$ = this.signUpClicked.asObservable();

  private logInClicked = new BehaviorSubject<boolean>(false);
  logInClicked$ = this.logInClicked.asObservable();

  setSignUpClicked(value: boolean) {
    this.signUpClicked.next(value);
  }

  setLogInClicked(value: boolean) {
    this.logInClicked.next(value);
  }

  setActualLogInClicked(value: boolean) {
    this.actualLogInClicked.next(value);
  }

  sharedObject: Notes = new Notes();
  setSharedObject(data: Notes) {
    this.sharedObject = data;
  }

  getSharedObject() {
    return this.sharedObject;
  }





}
