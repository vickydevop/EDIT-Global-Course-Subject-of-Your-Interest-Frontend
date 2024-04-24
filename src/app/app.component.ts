// import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { IframeService } from './shared/services/iframe/iframe.service';
// import { StyleManager } from './shared/services/style-manager/style-manager.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent implements OnInit, AfterViewInit {
//   constructor(
//     private _iframeService: IframeService,
//     private styleManager: StyleManager,
//     private _cdf: ChangeDetectorRef
//   ) {}
//   baseOrigin: string = 'http://localhost:4200';
//   isLoaded: boolean = false;

//   ngAfterViewInit(): void {
//     console.log('on change');

//     window.addEventListener('message', (e:any) => {
//       // console.log(e)
//       if (e.origin == this.baseOrigin) {
//       let parentData = JSON.parse(e.data);
//       let parser = JSON.parse(e?.data);
//       console.log(sessionStorage.setItem('access_token',parser?.access_token),'aoocomponen')
//       sessionStorage.setItem('access_token',parser?.access_token);
//         this._iframeService.getIframeMessages(parentData);
//         for (const key in parentData) {
//           if (Object.prototype.hasOwnProperty.call(parentData, key)) {
//             const value = parentData[key];
//             // sessionStorage.setItem(key, value);
//           }
//         }
//         this.isLoaded = true;
//         this._cdf.detectChanges();
//         // this.sendMessage('Received From Child', e.origin);
//       }
//     });

//     window.addEventListener('load', (e) => {
//       this.sendMessage('Received From Child', this.baseOrigin);
//     });
//   }

//   sendMessage(body: any, targetOrigin: string) {
//     // Make sure you are sending a string, and to stringify JSON
//     window.parent.postMessage(JSON.stringify(body), targetOrigin);
//   }

//   ngOnInit() {
//     console.log('on init v');

//     window.addEventListener('message', (e:any) => {
//       console.log(e,'e ngonit');
//       if (e.origin == this.baseOrigin) {
//       let parentData = JSON.parse(e.data);
//       let parser = JSON.parse(e?.data);
//       console.log(sessionStorage.setItem('access_token',parser?.access_token),'aoocomponen')
//       sessionStorage.setItem('access_token',parser?.access_token);
//         this._iframeService.getIframeMessages(parentData);
//         for (const key in parentData) {
//           if (Object.prototype.hasOwnProperty.call(parentData, key)) {
//             const value = parentData[key];
//             // sessionStorage.setItem(key, value);
//           }
//         }
//         this.isLoaded = true;
//         this._cdf.detectChanges();
//         // this.sendMessage('Received From Child', e.origin);
//       }
//     });

//     this._iframeService.getIframeEmit.subscribe((res) => {
//       console.log(res,'ngonit')
//       // this.toggleDarkTheme();
//       // this.styleManager.toggleDarkTheme();
//     });
//     this._iframeService.sendIframeEmit.subscribe((res) => {
//       console.log('Child ngonit', res);
//     });
//   }

//   ngOnDestroy() {
//     // if (this.mySubscription) {
//     //   this.mySubscription.unsubscribe();
//     // }
//   }
// }

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IframeService } from './shared/services/iframe/iframe.service';
import { StyleManager } from './shared/services/style-manager/style-manager.service';
import { ApiService } from './shared/services/api/api.service';
declare var GoogleTranslate: Function;
export let globalShareBaseOrigin: string;

export let baseOriginUrl:string
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  // _iframeService: any;
  // styleManager: any;
  // _cdf: any;
  // @HostListener('document:mousemove')
  // @HostListener('document:click')
  // @HostListener('document:keydown')
  // resetIdleTimeout() {
  //   this.sendMessage(false, baseOriginUrl)
  // }
  constructor(
    private _iframeService: IframeService,
    private styleManager: StyleManager,
    private _cdf: ChangeDetectorRef,
    private _apiService: ApiService
  ) {
    this.baseOrigin = window.location.ancestorOrigins[0];
    this.baseOrigin = window.location.ancestorOrigins[0];
    globalShareBaseOrigin = this.baseOrigin;
    baseOriginUrl= this.baseOrigin
        // this._apiService.create_table_based_on_user_id().subscribe({
        //   next:()=>{
        //     // console.log('hihiihihhihihihihi')
        //   },error:()=>{}
        // })
  }

  // baseOrigin: string = 'http://u3.getster.tech';
  baseOrigin!: string;
  isLoaded: boolean = false;

  ngOnInit() {
    this._iframeService.getIframeData.subscribe({
      next: (next: any) => {
        if (next) {
          this.styleManager.toggleDarkTheme(next.dark ?? false);
          setTimeout(() => {
            GoogleTranslate(next.googleTranslate);
          }, 1000);
        }
      },
    });
  }
  ngAfterViewInit(): void {
    this.iframeLoaded();
  }

  ngOnDestroy() {
    sessionStorage.clear();
  }

  iframeLoaded() {
    window.addEventListener('message', (e) => {
      // console.log(e,'iframe')
      // console.log(this.baseOrigin,'this.baseOrigin')
      // console.log(e.origin,'e.origin')
      if (e.origin == this.baseOrigin) {
        let parentData = JSON.parse(JSON.parse(JSON.stringify(e.data)));
              let parser = JSON.parse(e?.data);
              // console.log(parser,'parser')
              // console.log(sessionStorage.setItem('access_token',parser?.access_token),'aoocomponen')
              sessionStorage.setItem('access_token',parser?.access_token);
        for (const key in parentData) {
          // console.log(key, 'sdf');
          if (Object.prototype.hasOwnProperty.call(parentData, key)) {
            const value = parentData[key];
            sessionStorage.setItem(key, value);
          }
        }
        this.isLoaded = true;
        this.sendMessage(false, baseOriginUrl);
        this._apiService.create_table_based_on_user_id().subscribe({
          next:()=>{
            // console.log('hihiihihhihihihihi')
          },error:()=>{}
        })
        this._iframeService.sendIframeData(parentData);
        this._cdf.detectChanges();
        // this.sendMessage('Received From Child', e.origin);
      }
    });

    // Send data to parent message first time
    window.addEventListener('load', (e) => {
      this.sendMessage('Connected Successful.', this.baseOrigin);
      this._cdf.detectChanges();
    });
  }
  sendMessage(body: any, targetOrigin: string) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(JSON.stringify(body), targetOrigin);
  }
}
//
