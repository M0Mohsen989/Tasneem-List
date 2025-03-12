import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  imports: [MatInputModule, MatFormFieldModule, FormsModule , MatCardModule ,CdkDropListGroup, CdkDropList, CdkDrag , ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AppComponent implements OnInit {
  constructor(private todoService: TodoService,private toastr: ToastrService) {}
  task: string = '';
     tasksArray: any[] = []; // قائمة المهام التي لم تكتمل
    doneArray: any[] = []; // قائمة المهام التي تم الانتهاء منها
  
    ngOnInit(): void {
        this.loadTodos();
       }// جلب المهام من الـ API عند تحميل التطبيق


        loadTodos(): void {
               this.todoService.getTodos().subscribe((data) => {
                 this.tasksArray = data.filter((task) => !task.completed); // المهام التي لم تكتمل
                this.doneArray = data.filter((task) => task.completed); // المهام التي تم الانتهاء منها
              });
            }
      

            addTask(): void {
              if (this.task && this.task.trim() !== '') {
                const newTask = {
                  id: Date.now(), // ID مميز مؤقت
                  title: this.task.trim()
                };
                this.tasksArray.unshift(newTask); // بيضاف مباشرة للـ array اللي بيظهر منها كل شيء
                this.task = '';
              } else {
                this.toastr.error('Please enter a task');
              }
            }

                deleteTask(id: number): void {
                       this.todoService.deleteTodo(id).subscribe(() => {
                         this.tasksArray = this.tasksArray.filter((task) => task.id !== id); // حذف المهمة من القائمة
                       });
                     }


                     drop(event: CdkDragDrop<string[]>): void {
                           if (event.previousContainer === event.container) {
                             moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
                          } else {
                             transferArrayItem(
                               event.previousContainer.data,
                               event.container.data,
                               event.previousIndex,
                               event.currentIndex,
                             );
                           }
                         }
                      
                         trackByFn(index: number, item: any): any {
                           return item.id; // استخدام الـ id كمفتاح فريد
                         }
                        
                       }








/******************************************************************** */



// import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { TodoService } from './todo.service';  // استيراد الخدمة
// import { ToastrService } from 'ngx-toastr';
// import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class AppComponent implements OnInit {
//   task: string = '';
//   tasksArray: any[] = []; // قائمة المهام التي لم تكتمل
//   doneArray: any[] = []; // قائمة المهام التي تم الانتهاء منها

//   constructor(private todoService: TodoService, private toastr: ToastrService) {}

//   ngOnInit(): void {
//     this.loadTodos(); // جلب المهام من الـ API عند تحميل التطبيق
//   }

//   loadTodos(): void {
//     this.todoService.getTodos().subscribe((data) => {
//       this.tasksArray = data.filter((task) => !task.completed); // المهام التي لم تكتمل
//       this.doneArray = data.filter((task) => task.completed); // المهام التي تم الانتهاء منها
//     });
//   }

//   addTask(): void {
//     if (this.task && this.task.trim() !== '') {
//       this.todoService.addTodo(this.task.trim()).subscribe((newTask) => {
//         this.tasksArray.push(newTask); // إضافة المهمة للقائمة
//         this.task = ''; // مسح الحقل بعد إضافة المهمة
//       });
//     } else {
//       this.toastr.error('Please enter a task'); // إذا كان النص فارغًا
//     }
//   }

//   deleteTask(id: number): void {
//     this.todoService.deleteTodo(id).subscribe(() => {
//       this.tasksArray = this.tasksArray.filter((task) => task.id !== id); // حذف المهمة من القائمة
//     });
//   }

//   drop(event: CdkDragDrop<string[]>): void {
//     if (event.previousContainer === event.container) {
//       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//     } else {
//       transferArrayItem(
//         event.previousContainer.data,
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex,
//       );
//     }
//   }

//   trackByFn(index: number, item: any): any {
//     return item.id; // استخدام الـ id كمفتاح فريد
//   }
  
// }
