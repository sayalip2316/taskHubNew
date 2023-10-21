import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { ProjectManagerRoleGuard } from './project-manager-role.guard';

describe('ProjectManagerRoleGuard', () => {
  let guard: ProjectManagerRoleGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ProjectManagerRoleGuard],
    });
    guard = TestBed.inject(ProjectManagerRoleGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access for a user with "Project Manager" role', () => {
    // Implement your test logic here
  });

  it('should prevent access for a user without "Project Manager" role', () => {
    // Implement your test logic here
  });
});
