import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CommonService } from '../common.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: "app-change-box",
  templateUrl: "./change-box.component.html",
  styleUrls: ["./change-box.component.css"]
})
export class ChangeBoxComponent implements OnInit {
  @ViewChild("inputAmount") inputAmount: ElementRef;
  @ViewChild("search") search: ElementRef;
  denominationsArray = [];
  recentTransactionArray=[];
  recentFlag:boolean;
  recentTranscRes=[];
  public searchText : string;

  constructor(public authService:AuthService,private commonService:CommonService) {}

  ngOnInit() {
    this.commonService.getRecentTransaction({username: this.authService.loggedUser})
    .subscribe((data)=>{
      if(data){
        this.recentTranscRes = data.recentTransactions;
        console.log(this.recentTranscRes);
      }
    }

    );

  }
  onSubmit() {
    if(this.inputAmount.nativeElement.value){
      var originalNum = +this.inputAmount.nativeElement.value;
      var num = +this.inputAmount.nativeElement.value;
      var arr = [10, 5, 2, 1];
      var str = "";
      let newarr = [];
      for (let i = 0; i < arr.length; i++) {
        if (num >= arr[i]) {
          num = num - arr[i];
          str = str + arr[i] + ",";
          newarr.push(arr[i]);
          i--;
        }
      }
      this.denominationsArray.push({
        denominations: str.substring(0, str.length - 1),
        coinCount: `${newarr.reduce(
          (a, x) => (x === 10 ? a + 1 : a),
          0
        )} ${"Coin of"} ${"10"} ${","}
        ${newarr.reduce(
          (a, x) => (x === 5 ? a + 1 : a),
          0
        )} ${"Coin of"} ${"5"} ${","}
        ${newarr.reduce(
          (a, x) => (x === 2 ? a + 1 : a),
          0
        )} ${"Coin of"} ${"2"} ${","}
        ${newarr.reduce(
          (a, x) => (x === 1 ? a + 1 : a),
          0
        )} ${"Coin of"} ${"1"} ${","}`
      });
      this.recentTransactionArray.push({
        amount:originalNum,
        denominations:str.substring(0, str.length - 1)
      } );
      this.commonService.postRecentTransaction(
        {username: this.authService.loggedUser },
        {recentTransactions:this.recentTransactionArray}
      ).subscribe(res => {
        if (res) {
          console.log(res);
        }

      });

    }
    else{
      alert("Please enter amount")
    }

  }
  onDelete(index) {
    if (this.denominationsArray) {
      this.denominationsArray.splice(index, 1);
    }
  }
}
