import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [ButtonComponent, LoaderComponent],
  exports: [ButtonComponent, LoaderComponent],
  imports: [CommonModule],
})
export class SharedModule {}
