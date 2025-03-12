import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  // لإضافة مهمة جديدة
  addTodo(task: string): Observable<any> {
    const newTask = { title: task, completed: false };
    return this.http.post<any>(this.apiUrl, newTask);
  }



   // لحذف مهمة
   deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }




}
