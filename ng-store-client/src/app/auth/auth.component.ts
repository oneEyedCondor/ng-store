import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Auth, IUser } from '../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    isAuthentication: boolean = false;
    authForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private auth: Auth) { 
        
        this.authForm = fb.group({
            'userName':             ['', this.isRequired()],
            'userLogin':            ['', [ Validators.required, Validators.email, Validators.minLength(6) ]],
            'userPassword':         ['', [ Validators.required, Validators.minLength(6) ]],
            'userConfirmPassword':  ['', this.isRequired()],
        }, { validator: this.checkPasswords });
    }

    hideComponent(event) {
        event.target.className === 'auth' && this.router.navigate(['/']);
    }

    ngOnInit(): void {
        this.route.paramMap
            .pipe( switchMap( params => params.getAll('action')) )
            .subscribe( data => {
                this.isAuthentication = (data !== 'sign-in') ? true : false;
            });
    }

    toggleAuthentication(val: boolean): void {
        this.isAuthentication = val;
        this.router.navigate(['auth', (val ? 'sign-up' : 'sign-in')]);
    }

    isRequired() {
        return (this.isAuthentication)
            ? [ Validators.required, Validators.minLength(6) ]
            : [ Validators.minLength(6) ];
    }

    checkPasswords = (group: FormGroup): {[s:string]:boolean} => {
        if(!this.isAuthentication) return null;

        const pass = group.get('userPassword').value;
        const confirmPass = group.get('userConfirmPassword').value;
        return (pass === confirmPass) ? null : { notSame: true };   
    }

    submitHandler() {
        const body: IUser = { login: this.authForm.value.userLogin, password: this.authForm.value.userPassword };

        if(this.isAuthentication) {
            body.name = this.authForm.value.userName;
            this.auth.signUp(body);
        } else {
            this.auth.signIn(body);
        }
        this.authForm.reset();
    }

}
