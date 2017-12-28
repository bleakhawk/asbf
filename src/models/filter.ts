export class Filter {
  name: string;
  isChecked: boolean;

  constructor(_name: string, _isChecked: boolean) {
    this.name = _name; 
    this.isChecked = _isChecked;
  }
}