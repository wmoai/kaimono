export class Identifier<T> {
  constructor(private value: string) {
    this.value = value;
  }

  toValue(): string {
    return this.value;
  }
}
