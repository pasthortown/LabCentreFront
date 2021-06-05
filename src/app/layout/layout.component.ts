import { Component, OnInit } from '@angular/core';
import { ProfilePicture } from 'src/app/models/profile/ProfilePicture';
import { User } from 'src/app/models/profile/User';
import { UserService } from 'src/app/services/profile/user.service';
import { ProfilePictureService } from 'src/app/services/profile/profilepicture.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    collapedSideBar: boolean;
    user = new User();
    profile_picture = new ProfilePicture();

    show_menu: any = {
        has_laboratory: false,
        show_my_data: false,
        send_results: false,
        my_laboratory: false,
        my_templates: false,
        patient: false,
        laboratory: false,
        laboratory_attachment: false,
        laboratory_auth_user: false,
        user_profile: false,
        account_profile: false,
        template: false
    }

    constructor(public profilePictureDataService: ProfilePictureService, private userDataService: UserService) {}

    ngOnInit() {
        this.getUserInfo();
    }

    getUserInfo() {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        this.checkProfiles(userData.profiles, userData.laboratory_id);
        this.userDataService.get(userData.id).then( r => {
            this.user = r as User;
            this.getProfilePicture();
        }).catch( e => { console.log(e); });
    }

    checkProfiles(profiles: any[], laboratory_id: number) {
        let is_admin = false;
        let is_lab_admin = false;
        profiles.forEach(element => {
            if (element.profile_id == 1) {
                is_admin = true;
            }
            if (element.profile_id == 2) {
                is_lab_admin = true;
            }
        });

        this.show_menu = {
            has_laboratory: laboratory_id > 0,
            show_my_data: is_admin || (is_lab_admin && laboratory_id > 0),
            send_results: (is_lab_admin && laboratory_id > 0),
            my_laboratory: (is_lab_admin && laboratory_id > 0),
            my_templates: (is_lab_admin && laboratory_id > 0),
            patient: is_admin,
            laboratory: is_admin,
            laboratory_attachment: is_admin,
            laboratory_auth_user: is_admin,
            user_profile: is_admin,
            account_profile: is_admin,
            template: is_admin
        }
    }

    getProfilePicture() {
        this.profilePictureDataService.get(this.user.id).then( r2 => {
            if (typeof r2.id !==  'undefined') {
                this.profile_picture = r2 as ProfilePicture;
            }
        }).catch( e => { console.log(e); });
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
