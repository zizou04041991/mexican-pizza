import { Component } from '@angular/core';
import { Header } from '../header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,Header],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
