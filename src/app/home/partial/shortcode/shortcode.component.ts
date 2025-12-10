import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-shortcode',
  standalone: false,
  templateUrl: './shortcode.component.html',
  styleUrl: './shortcode.component.css'
})
export class ShortcodeComponent {


@Output() shortcodeEntered = new EventEmitter<string>();

shortcodeForm: FormGroup;

constructor(private fb: FormBuilder) {
  this.shortcodeForm = this.fb.group({
    shortcode: ['']
  });
}

onShortcodeEnter(): void {
  const shortcodeValue = this.shortcodeForm.get('shortcode')?.value;
  if (shortcodeValue && shortcodeValue.trim() !== '') {
    this.shortcodeEntered.emit(shortcodeValue.trim());
    // Optionally reset the input
    // this.shortcodeForm.reset();
  }
}

}
