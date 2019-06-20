export class Identifier<T> {
  constructor(private value: string) {
    this.value = value;
  }

  equal(id: Identifier<T>) {
    return id.toValue() === this.value;
  }

  toValue(): string {
    return this.value;
  }
}
