import { TestResponseItem } from "./testResponseItem"

export class TestResponse {
  public result: TestResponseItem[]

  public constructor(data: TestResponseItem[]) {
    this.result = data
  }
}
