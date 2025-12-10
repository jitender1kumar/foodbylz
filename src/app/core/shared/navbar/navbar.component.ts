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
  // Profile dropdown toggle logic for profile section in navbar.component.html

  dropdownVisible: boolean = false;

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
    // Instead of direct DOM, use *ngIf or [hidden] in the template for visibility
    // Optionally, still provide the fallback for existing HTML if required:
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) {
      dropdown.style.display = this.dropdownVisible ? 'block' : 'none';
    }
  }

  // If you want to close the dropdown when you click outside
  // (optional, for better UX)
  ngOnInit(): void {
    document.addEventListener('click', this.handleOutsideClick);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (event: any) => {
    const dropdown = document.getElementById('profileDropdown');
    const profile = document.querySelector('.profile');
    if (
      dropdown &&
      profile &&
      !profile.contains(event.target)
    ) {
      this.dropdownVisible = false;
      dropdown.style.display = 'none';
    }
  };


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
