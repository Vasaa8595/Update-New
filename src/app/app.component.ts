import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';



interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;

}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
}) 
export class AppComponent {
  title = 'Grievanve Portal';
  
  isSideNavCollapsed=false;
  screenWidth = 0;

  

  onToggleSideNav(data: SideNavToggle): void{
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;

    
  }
}
