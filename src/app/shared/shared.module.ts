import {NgModule} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [HttpClientModule,
    // QuillModule.forRoot(),
],
  exports: [HttpClientModule,
    // QuillModule
  ]

})
export class SharedModule {

}
