import { Component, EventEmitter, Output } from '@angular/core';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    standalone: false
})
export class NavbarComponent {

  constructor() {}
  @Output() notifyManage: EventEmitter<string> = new EventEmitter<string>();
  showtablefun()
{
  this.notifyManage.emit("tables");
}
showcustomersfun() {
  this.notifyManage.emit("customers");
}
showordersfun() {
  this.notifyManage.emit("orders");
}

showdashboardfun() {
  this.notifyManage.emit("dashboard");
}
showmanagefun() {
 this.notifyManage.emit("manage");
}
showhomefun() {
  this.notifyManage.emit("home");
 }
 showrunningorderfun() {
  this.notifyManage.emit("runningorder");
 }

  x:any;
myFunction() {
   this.x = document.getElementById("myTopnav");
    if (this.x.className === "topnav") {
      this.x.className += " responsive";
    } else {
      this.x.className = "topnav";
    }
}
 
}
