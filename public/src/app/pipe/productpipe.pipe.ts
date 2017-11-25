import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productpipe'
})
export class ProductpipePipe implements PipeTransform {

  transform(object: any, searchtext: any): any {
    console.log(object);
    if(!searchtext)
    {
      console.log("test");
      return object;
    }
    else
    {
    return object.filter((result)=>{
      console.log(result);
        return result.nameproduct.toLowerCase().indexOf(searchtext.toLowerCase())>-1;
       })
      }
  }
  

}
