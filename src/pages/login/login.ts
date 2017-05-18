import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, ActionSheetController  } from 'ionic-angular';

//Provider
import { LoginProvider } from '../../providers/login';
import {HomePage} from '../home/home';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  @ViewChild('contentPassword')contentPassword;
  @ViewChild('contentUsers')contentUsers;

  user : any = {email: '',pass:''};
  public users : any = [];
  public repositories:any;
  public sendHome: any = [];
  public repOne: any = [];
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public loginPro: LoginProvider, public actionSheetCtrl: ActionSheetController) {
    this.repositories = [];

    this.repOne = {name:"Seleccione un usuario",  owner:{
      image:"https://avatars0.githubusercontent.com/u/10576462?v=3"
    }};

    this.loginPro.reposGithub().subscribe((data) =>{
      this.repositories = data.json();
      console.log(this.repositories);
    });
  }

  beforeSend(user:any){
    console.log(user);
  }
  setMainRepository(repository){
    this.repOne = repository;
    console.log(this.repOne);
    this.contentPassword.nativeElement.style.display = 'block';
    //this.contentUsers.nativeElement.style.display = 'none';
    if(this.users.password === this.repOne.id){
      console.log("Bien")
    }else{
      console.log("Mal")
    }
  }
  
  ionViewDidLoad() {
    this.loginPro.getUsers().subscribe(data=>{
      if(data.status === 200) {
        this.users = data.results;
        console.log(this.users);
        
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Sin Usuarios',
          subTitle: 'No se encontró ningún usuario!',
          buttons: ['OK']
        });
        alert.present();
      }
      
    });
  }
  submit(user:any){
    console.log(user);
    
  	this.loginPro.validar(user).subscribe(data=>{
      console.log(data);
      if(data.status === 200) {
        this.navCtrl.push(HomePage, [this.sendHome]);  
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Datos incorrecto',
          subTitle: 'Por favor ingresa de nuevo tus datos!',
          buttons: ['OK']
        });
        alert.present();
      }
      
    });

  }
}