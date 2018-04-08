import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators,FormArray} from '@angular/forms'
import {Http,Response} from '@angular/http'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

	private recipefrm : FormGroup;
	private recipyData :any[];
	private btn_stt:boolean=true;
	private update_key:string;

  constructor(private fb :FormBuilder,private http:Http) { }

  ngOnInit() {
	
  	this.recipefrm = this.fb.group({
  		name:[''],cost:[''],
  		ingredients:this.fb.array([])
  	})
	  this.getRecipieData();
	  this.dosomthing().then(function(res)
	{
		console.log(res);
	}).catch(function(res)
{
	console.log('error',res);
})
  }

  getRecipieData()
  {
  	this.http.get('https://angular5490.firebaseio.com/recipy.json').subscribe(
  		(res : Response )=>
  		{
  			console.log("data submitted",res.json());
  			let data = res.json();
  			let keys = Object.keys(data);
  			let items = [];
  			keys.forEach(function(key)
  			{
  				items.push(
  				{
  					key:key,
  					value:data[key]
  				})
  			});
  			this.recipyData = items;
  			console.log("data submitted",items);

  		},
  		(error)=>
  		{
  			console.log("Submit Error",error);
  		})
  }

  createIngredientsForm()
  {
  	return this.fb.group(
  	{
  		iName:[''],iWeight:['']
  	});
  }

  addItemForm()
  {
  	let formControl = this.recipefrm.get('ingredients') as FormArray;
  	formControl.push(this.createIngredientsForm());
  }

  submit()
  {
  	console.log(this.recipefrm.value);
  	this.http.post('https://angular5490.firebaseio.com/recipy.json',this.recipefrm.value).subscribe(
  		(res : Response )=>
  		{
  			console.log("data submitted",this.recipefrm.value);
  			this.getRecipieData();
  			this.clearData();
  		},(error)=>
  		{
  			console.log("Submit Error",error);
  		});

  }

  clearData()
  {
	  this.recipefrm.patchValue({name:'',cost:''});
	  var control = this.recipefrm.get("ingredients") as FormArray;
	  control.controls = [];
	  console.log('control ',control);
  }

	deleteRecipy(key)
	{
		this.http.delete('https://angular5490.firebaseio.com/recipy/'+key+'.json').subscribe(
			(res:Response)=>
			{
				console.log("deleted",key);
				this.getRecipieData();
			},
			(error)=>
			{
				console.log('Delete key error',error);
			});
	}

	delIngredientForm(index){

		var control = this.recipefrm.get("ingredients") as FormArray;
		control.removeAt(index)
	}

	editRecipy(rawDataObj)
	{
		let rawData = rawDataObj.value;
		for(let i =0;i<rawData.ingredients.length;i++){
			this.addItemForm();
		 }
		console.log('Edit record is ', rawData.ingredients)
		this.recipefrm.patchValue(rawData)
		this.btn_stt=false;
		this.update_key=rawDataObj.key;
	}

	update()
	{
		this.http.put('https://angular5490.firebaseio.com/recipy/'+this.update_key+'.json' , this.recipefrm.value).subscribe(
			(res: Response) => {
				console.log("data updated.", this.recipefrm.value);
				this.getRecipieData();
				this.clearData();
				this.btn_stt = true;
			}, (error) => {
				console.log("Submit Error", error);
			});
			
			// console.log(this.recipefrm.value);
	}




	dosomthing() {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				resolve(3000);
			}, 10000);
			setTimeout(function() {
				reject('something Wrong');
				
			}, 4000);
		}
		);


}
