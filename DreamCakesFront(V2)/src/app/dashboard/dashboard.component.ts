import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userRole!: string | null;
  currentPath: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userRole = localStorage.getItem("role");
  }

  checkPath(): boolean {
    this.currentPath = this.router.url;

    return this.currentPath === '/dashboard';
  }
}

