export class Identifier<T> {
  constructor(private value: string) {
    this.value = value;
  }

  equal(id: Identifier<T>) {
    return id.toString() === this.value;
  }

  toString(): string {
    return this.value;
  }
}
