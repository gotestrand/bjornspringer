import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-token-exchange',
  templateUrl: './token-exchange.component.html',
  styleUrls: ['./token-exchange.component.scss']
})
export class TokenExchangeComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute, 
    private _userService: UserService, 
    private _authService: AuthService,
    private _router: Router) { 

  }


  ngOnInit() {

    this._route.queryParams.subscribe((params) => {
      debugger
      let state = params['state'];
      let code = params['code'];

      this._userService.user.state = state;  
      this._userService.save();

      this._authService.authorize(code).subscribe(response => {
        let data = response.text() ? response.json() : {};

        this._authService.setAccessToken(data.access_token);
        this._userService.user.athlete = data.athlete;
        this._userService.save();
        
        this._router.navigate(['/']);

      });
    });

  }

}
