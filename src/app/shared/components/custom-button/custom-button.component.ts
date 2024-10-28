import { Component, input, output } from '@angular/core';

@Component({
  selector: 'custom-button',
  standalone: true,
  imports: [],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css'
})
export class CustomButtonComponent {
  buttonTxt = input.required<string>();
  buttonType = input<"primary"|"secondary">("primary");
  click = output<boolean>();

  onClick() {
    this.click.emit(true);
  }
}
