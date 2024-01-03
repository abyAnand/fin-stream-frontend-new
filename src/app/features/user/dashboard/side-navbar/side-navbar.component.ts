import { Component } from '@angular/core';
import { faTachometerAlt, faUser, faWallet, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {

  faTachometerAlt = faTachometerAlt;
  faUser = faUser ;
  faWallet = faWallet;
  faExchangeAlt = faExchangeAlt;



}
