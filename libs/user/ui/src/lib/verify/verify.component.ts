import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { userActions } from '@ngbank/user/store';

@Component({
  selector: 'ngbank-verify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
})
export class VerifyComponent implements OnInit {
  store = inject(Store);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param) => {
      const userId = param['userId'] || '';
      const secret = param['secret'] || '';

      console.log({ userId, secret });

      this.store.dispatch(
        userActions.verifyUserEmail({
          token: {
            userId: userId,
            secret: secret,
          },
        })
      );
    });
  }
}
