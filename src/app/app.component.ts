import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  _items: string[] = ["red", "blue", "red", "green", "blue"];
  _order: string[] = ["blue", "red", "black"];


  set items(val) {
    this._items = (val as unknown as string).split(',');
    this.resetResult();
  }

  get items() {
    return this._items;
  }

  set order(val) {
    this._order = (val as unknown as string).split(',');
    this.resetResult();
  }

  get order() {
    return this._order;
  }



  result: string[] = [];


  updateResult() {
    this.result = this.getFilteredResultEfficiently(this.items, this.order);
  }

  resetResult() {
    this.result = [];
  }

  /**
   * Brute force solution which would work well only for small data sets and would not scale efficiently.
   * This uses a nested loop and hence the solution uses O(n^2) time complexity thus is not performant for larger data sets
   */
  getFilteredResult(items: string[], order: string[]): string[] {
    const result: string[] = [];

    order.forEach((color) => {

      for (let i = 0; i < items.length; i++) {
        if (items[i] === color) {
          result.push(items[i])
        }
      }

    })
    return result;
  }


  /**
   * This solution is more efficient in terms of time complexity than the previous one as it traverses both arrays once.
   * We could say this would be roughly a O(n + k) solution where n is the size of the items array and k is the size of the orders array.
   * This algorythm uses more space as it maintains a map of items.
   */
  getFilteredResultEfficiently(items: string[], order: string[]): string[] {
    let result: string[] = [];

    const colorBucket: { [name: string]: string[] } = {};

    // iterate over the items array and form a bucket. This runs n times (where n is the length of items array)
    items.forEach((color) => {
      if (colorBucket[color]) {
        // add to the array
        colorBucket[color].push(color);
      } else {
        // initialize the array
        colorBucket[color] = [color];
      }
    });

    console.log(colorBucket);

    // now iterate over the order array and lookup in the bucket. This runs k times (where k is the length of order array)
    order.forEach((orderColor) => {

      if (colorBucket[orderColor]) {
        result = result.concat(colorBucket[orderColor]);
      }

    })
    return result;
  }


}
